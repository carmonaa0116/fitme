<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;
$data = json_decode(file_get_contents('php://input'), true);

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

if (!isset($data['id_rutina'])) {
    echo json_encode(['error' => 'ID de rutina no proporcionado']);
    exit;
}

// Incrementar el campo visitas en 1 para la rutina con el id proporcionado
$stmt = $conexion->prepare("UPDATE rutinas SET visitas = visitas + 1 WHERE id = ?");
$stmt->bind_param("i", $data['id_rutina']);
$success = $stmt->execute();

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Visitas actualizadas']);
} else {
    echo json_encode(['error' => 'Error al actualizar visitas']);
}