<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';

$conexion = $conn;

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    echo json_encode(['error' => 'ID no proporcionado']);
    exit;
}

$id = $data['id'];

// Eliminar registros de la tabla ejercicio_musculo
$sql = "DELETE FROM ejercicio_musculo WHERE ejercicio_id = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();

// Eliminar registro de la tabla ejercicios
$sql = "DELETE FROM ejercicios WHERE id = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Ejercicio eliminado correctamente']);
} else {
    echo json_encode(['error' => 'Error al eliminar el ejercicio: ' . $stmt->error]);
}

$stmt->close();
$conexion->close();
exit;
?>

