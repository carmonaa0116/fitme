<?php
// Habilitar CORS
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

// Leer y decodificar el JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si se recibieron los datos necesarios
if (!isset($data['id_solicitud']) || !isset($data['estado'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$id_solicitud = $data['id_solicitud'];
$estado = $data['estado'];

// Validar el estado permitido
$estados_permitidos = ['Aceptada', 'Pendiente', 'Denegada'];
if (!in_array($estado, $estados_permitidos)) {
    echo json_encode(['error' => 'Estado no válido']);
    exit;
}

// Preparar la consulta SQL
$sql = "UPDATE solicitudes_amistad SET estado = ?, fecha_respuesta = CURRENT_TIMESTAMP WHERE id = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("si", $estado, $id_solicitud);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Estado actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar el estado: ' . $stmt->error]);
}

$stmt->close();
$conexion->close();
exit;
?>
