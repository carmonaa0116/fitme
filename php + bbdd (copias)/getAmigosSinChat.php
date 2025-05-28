<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_usuario'])) {
    $id_usuario = $data['id_usuario'];

    $sql = "
        SELECT 
            CASE 
                WHEN a.id_usuario1 = ? THEN a.id_usuario2
                ELSE a.id_usuario1
            END AS amigo_id
        FROM amigos a
        WHERE (a.id_usuario1 = ? OR a.id_usuario2 = ?)
        AND NOT EXISTS (
            SELECT 1 FROM chats c
            WHERE 
                (c.user1_id = ? AND c.user2_id = CASE WHEN a.id_usuario1 = ? THEN a.id_usuario2 ELSE a.id_usuario1 END)
                OR 
                (c.user2_id = ? AND c.user1_id = CASE WHEN a.id_usuario1 = ? THEN a.id_usuario2 ELSE a.id_usuario1 END)
        )
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iiiiiii", $id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $ids_amigos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $ids_amigos[] = $fila['amigo_id'];
    }
    $stmt->close();

    $amigos_completos = [];

    if (count($ids_amigos) > 0) {
        $placeholders = implode(',', array_fill(0, count($ids_amigos), '?'));
        $sql_usuarios = "
            SELECT id, nombre_usuario, nombre, sexo, fecha_nacimiento, experiencia, altura, peso, fecha_registro, email, foto_perfil 
            FROM usuarios 
            WHERE id IN ($placeholders)
        ";
        $stmt_usuarios = $conexion->prepare($sql_usuarios);
        $tipos = str_repeat('i', count($ids_amigos));
        $stmt_usuarios->bind_param($tipos, ...$ids_amigos);
        $stmt_usuarios->execute();
        $resultado_usuarios = $stmt_usuarios->get_result();

        while ($usuario = $resultado_usuarios->fetch_assoc()) {
            $usuario['foto_perfil'] = !is_null($usuario['foto_perfil']) 
                ? base64_encode($usuario['foto_perfil']) 
                : null;
            $amigos_completos[] = $usuario;
        }

        $stmt_usuarios->close();
    }

    echo json_encode($amigos_completos);
} else {
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
}

$conexion->close();
?>
