<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';

if (!isset($conn) || !$conn) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

// Leer el cuerpo de la petición y decodificar el JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id_destinatario'])) {
    echo json_encode(['error' => 'Falta el parámetro id_destinatario']);
    exit;
}

$id_destinatario = $data['id_destinatario'];

// Obtener notificaciones solo para el id_destinatario dado y estado "Pendiente"
$sql = "SELECT sa.id AS solicitud_id, sa.estado, sa.fecha_solicitud, sa.fecha_respuesta, u1.id AS id_remitente, u1.nombre_usuario AS remitente_usuario, u1.nombre AS remitente_nombre, u1.sexo AS remitente_sexo, u1.fecha_nacimiento AS remitente_fecha_nacimiento, u1.experiencia AS remitente_experiencia, u1.altura AS remitente_altura, u1.peso AS remitente_peso, u1.email AS remitente_email, u2.id AS id_destinatario, u2.nombre_usuario AS destinatario_usuario, u2.nombre AS destinatario_nombre, u2.sexo AS destinatario_sexo, u2.fecha_nacimiento AS destinatario_fecha_nacimiento, u2.experiencia AS destinatario_experiencia, u2.altura AS destinatario_altura, u2.peso AS destinatario_peso, u2.email AS destinatario_email FROM solicitudes_amistad sa JOIN usuarios u1 ON sa.id_remitente = u1.id JOIN usuarios u2 ON sa.id_destinatario = u2.id WHERE sa.estado = 'Pendiente' AND sa.id_destinatario = ?;";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error al preparar la consulta']);
    exit;
}

$stmt->bind_param("i", $id_destinatario);

if (!$stmt->execute()) {
    echo json_encode(['error' => 'Error al ejecutar la consulta']);
    exit;
}

$result = $stmt->get_result();

$notificaciones = [];
while ($row = $result->fetch_assoc()) {
    $notificaciones[] = $row;
}

if (count($notificaciones) === 0) {
    echo json_encode(['mensaje' => 'No hay notificaciones pendientes']);
    exit;
} else {
    echo json_encode($notificaciones);
}


$stmt->close();
$conn->close();
