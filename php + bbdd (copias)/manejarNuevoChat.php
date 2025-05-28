<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Obtener el JSON con los dos IDs de usuario
$data = json_decode(file_get_contents("php://input"), true);

// Verificar que los dos IDs están presentes
if (isset($data['user1_id']) && isset($data['user2_id'])) {
    $user1 = intval($data['user1_id']);
    $user2 = intval($data['user2_id']);

    // Buscar si ya existe un chat entre los dos (sin importar el orden)
    $sql = "SELECT id FROM chats 
            WHERE (user1_id = ? AND user2_id = ?) 
               OR (user1_id = ? AND user2_id = ?) 
            LIMIT 1";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iiii", $user1, $user2, $user2, $user1);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($fila = $resultado->fetch_assoc()) {
        // Chat ya existe
        $chatId = $fila['id'];
        echo json_encode(["existe" => true, "chat_id" => $chatId]);
        exit;
    } else {
        // Chat no existe, crearlo
        $sqlInsert = "INSERT INTO chats (user1_id, user2_id) VALUES (?, ?)";
        $stmtInsert = $conexion->prepare($sqlInsert);
        $stmtInsert->bind_param("ii", $user1, $user2);
        
        if ($stmtInsert->execute()) {
            $nuevoChatId = $conexion->insert_id;
            echo json_encode(["existe" => false, "chat_id" => $nuevoChatId]);
            exit;
        } else {
            echo json_encode(["error" => "Error al crear el chat"]);
        }
        $stmtInsert->close();
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Faltan datos de los usuarios"]);
}

$conexion->close();
?>
