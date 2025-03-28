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

// Preparar y ejecutar la consulta SQL
$stmt = $conexion->prepare("SELECT m.id as id, m.nombre as nombre FROM ejercicio_musculo em JOIN musculos m ON em.musculo_id = m.id WHERE em.ejercicio_id = ?;");
$stmt->bind_param("i", $data['idEjercicio']);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$musculos = array();
while ($row = $result->fetch_assoc()) {
    $musculos[] = ['id' => $row['id'], 'nombre' => $row['nombre']];
}

echo json_encode(['musculos' => $musculos]);
