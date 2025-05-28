<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

// Verificar si se recibieron los datos esperados
// Obtener los datos JSON enviados en el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_remitente']) || !isset($data['id_destinatario'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}
$id_remitente = intval($data['id_remitente']);
$id_destinatario = intval($data['id_destinatario']);

// Insertar la solicitud de amistad
$sql = "INSERT INTO solicitudes_amistad (id_remitente, id_destinatario, estado) VALUES (?, ?, 'Pendiente')";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("ii", $id_remitente, $id_destinatario);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Solicitud de amistad enviada correctamente']);
} else {
    echo json_encode(['error' => 'Error al enviar la solicitud: ' . $stmt->error]);
}

$stmt->close();
$conexion->close();
exit;
?>