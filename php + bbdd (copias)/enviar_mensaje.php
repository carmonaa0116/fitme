<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

require_once 'conexion.php';
$conexion = $conn;

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['emisor_id'], $data['receptor_id'], $data['contenido'])) {
    echo json_encode(["success" => false, "error" => "Faltan datos"]);
    exit;
}

$emisor = intval($data['emisor_id']);
$receptor = intval($data['receptor_id']);
$contenido = trim($data['contenido']);

// Primero obtener el chat_id
$sql_chat = "SELECT id FROM chats WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?) LIMIT 1";
$stmt_chat = $conexion->prepare($sql_chat);
$stmt_chat->bind_param("iiii", $emisor, $receptor, $receptor, $emisor);
$stmt_chat->execute();
$result_chat = $stmt_chat->get_result();

if ($fila_chat = $result_chat->fetch_assoc()) {
    $chat_id = $fila_chat['id'];
} else {
    // Opcional: crear chat si no existe
    echo json_encode(["success" => false, "error" => "No existe chat entre los usuarios"]);
    exit;
}

// Insertar el mensaje
$sql = "INSERT INTO mensajes (chat_id, emisor_id, mensaje) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conexion->error]);
    exit;
}

$stmt->bind_param("iis", $chat_id, $emisor, $contenido);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$stmt_chat->close();
$conexion->close();
?>
