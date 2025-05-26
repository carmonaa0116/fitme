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

if (!isset($data['nombreUsr'])) {
    echo json_encode(['error' => 'Falta el parámetro nombreUsr']);
    exit;
}

$nombreUsr = '%' . $data['nombreUsr'] . '%'; // Agregar comodines para buscar coincidencias parciales

// Preparar y ejecutar la consulta SQL
$stmt = $conexion->prepare("SELECT id, nombre_usuario, nombre, experiencia, foto_perfil FROM usuarios WHERE nombre_usuario LIKE ?");
$stmt->bind_param("s", $nombreUsr);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$usuarios = array();
while ($row = $result->fetch_assoc()) {
    $usuarios[] = [
        'id' => $row['id'],
        'nombre_usuario' => $row['nombre_usuario'],
        'nombre' => $row['nombre'],
        'experiencia' => $row['experiencia'],
        'foto_perfil' => base64_encode($row['foto_perfil']) // Codificar en base64
    ];
}

echo json_encode([
    'encontrado' => !empty($usuarios),
    'usuarios' => $usuarios
]);