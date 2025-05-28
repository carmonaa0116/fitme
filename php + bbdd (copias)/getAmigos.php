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
                WHEN id_usuario1 = ? THEN id_usuario2
                ELSE id_usuario1
            END AS amigo_id
        FROM amigos
        WHERE id_usuario1 = ? OR id_usuario2 = ?
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iii", $id_usuario, $id_usuario, $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $ids_amigos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $ids_amigos[] = $fila['amigo_id'];
    }
    $stmt->close();

    $amigos_completos = [];

    if (count($ids_amigos) > 0) {
        // Construir la cláusula IN (?, ?, ?...)
        $placeholders = implode(',', array_fill(0, count($ids_amigos), '?'));
        $sql_usuarios = "SELECT id, nombre_usuario, nombre, sexo, fecha_nacimiento, experiencia, altura, peso, fecha_registro, email, foto_perfil FROM usuarios WHERE id IN ($placeholders)";
        $stmt_usuarios = $conexion->prepare($sql_usuarios);

        // Crear el string de tipos para bind_param (todos son int)
        $tipos = str_repeat('i', count($ids_amigos));
        $stmt_usuarios->bind_param($tipos, ...$ids_amigos);
        $stmt_usuarios->execute();
        $resultado_usuarios = $stmt_usuarios->get_result();

        while ($usuario = $resultado_usuarios->fetch_assoc()) {
            // Codificar imagen solo si no es NULL
            if (!is_null($usuario['foto_perfil'])) {
                $usuario['foto_perfil'] = base64_encode($usuario['foto_perfil']);
            } else {
                $usuario['foto_perfil'] = null;
            }

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
