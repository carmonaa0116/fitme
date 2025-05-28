<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_usuario'])) {
    $id_usuario = $data['id_usuario'];

    // Primero se obtienen los chats donde participa el usuario
    $sql = "
        SELECT 
            c.id AS chat_id,
            CASE 
                WHEN c.user1_id = ? THEN c.user2_id
                ELSE c.user1_id
            END AS otro_usuario_id,
            c.creado_en
        FROM chats c
        WHERE c.user1_id = ? OR c.user2_id = ?
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iii", $id_usuario, $id_usuario, $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $chats = [];

    while ($fila = $resultado->fetch_assoc()) {
        $chats[] = $fila;
    }
    $stmt->close();

    $respuesta_final = [];

    // Ahora, por cada chat, se obtiene la información del otro usuario
    foreach ($chats as $chat) {
        $otro_usuario_id = $chat['otro_usuario_id'];

        $sql_usuario = "
            SELECT id, nombre_usuario, nombre, sexo, fecha_nacimiento, experiencia, altura, peso, fecha_registro, email, foto_perfil 
            FROM usuarios 
            WHERE id = ?
        ";

        $stmt_usuario = $conexion->prepare($sql_usuario);
        $stmt_usuario->bind_param("i", $otro_usuario_id);
        $stmt_usuario->execute();
        $resultado_usuario = $stmt_usuario->get_result();

        if ($usuario = $resultado_usuario->fetch_assoc()) {
            $usuario['foto_perfil'] = !is_null($usuario['foto_perfil']) 
                ? base64_encode($usuario['foto_perfil']) 
                : null;

            // Agregamos datos del chat junto con los del usuario
            $respuesta_final[] = [
                "chat_id" => $chat['chat_id'],
                "creado_en" => $chat['creado_en'],
                "usuario" => $usuario
            ];
        }

        $stmt_usuario->close();
    }

    echo json_encode($respuesta_final);
} else {
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
}

$conexion->close();
?>