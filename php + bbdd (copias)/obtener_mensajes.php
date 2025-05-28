<?php
// Activar CORS
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

require_once 'conexion.php';
$conexion = $conn;

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_usuario'], $data['id_amigo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$id_usuario = intval($data['id_usuario']);
$id_amigo = intval($data['id_amigo']);

// Buscar el chat_id común entre los dos usuarios
$sql_chat = "SELECT id FROM chats 
             WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
             LIMIT 1";

$stmt_chat = $conexion->prepare($sql_chat);
$stmt_chat->bind_param("iiii", $id_usuario, $id_amigo, $id_amigo, $id_usuario);
$stmt_chat->execute();
$result_chat = $stmt_chat->get_result();

if ($fila_chat = $result_chat->fetch_assoc()) {
    $chat_id = $fila_chat['id'];
} else {
    echo json_encode(['mensajes' => [], 'mensaje' => 'No existe chat entre estos usuarios']);
    $stmt_chat->close();
    $conexion->close();
    exit;
}

// Obtener los mensajes del chat correspondiente, junto con el nombre del emisor (asumiendo tabla usuarios)
$sql_mensajes = "SELECT m.emisor_id, u.nombre AS emisor_nombre, m.mensaje AS contenido, m.enviado_en 
                 FROM mensajes m
                 LEFT JOIN usuarios u ON m.emisor_id = u.id
                 WHERE m.chat_id = ?
                 ORDER BY m.enviado_en ASC";

$stmt = $conexion->prepare($sql_mensajes);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta de mensajes: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("i", $chat_id);
$stmt->execute();

$resultado = $stmt->get_result();
$mensajes = [];

while ($fila = $resultado->fetch_assoc()) {
    // Definir tipo_emisor: "mio" si el emisor es el usuario actual, "otro" en caso contrario
    $fila['tipo_emisor'] = ($fila['emisor_id'] === $id_usuario) ? "mio" : "otro";

    // En caso de que no haya nombre, poner "Desconocido"
    if (empty($fila['emisor_nombre'])) {
        $fila['emisor_nombre'] = "Desconocido";
    }

    $mensajes[] = $fila;
}

echo json_encode($mensajes);

$stmt->close();
$stmt_chat->close();
$conexion->close();
exit;
?>
