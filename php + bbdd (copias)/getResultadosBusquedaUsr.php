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
$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE nombre_usuario LIKE ?");
$stmt->bind_param("s", $nombreUsr);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$usuarios = array();
while ($row = $result->fetch_assoc()) {
    $usuario = [];
    foreach ($row as $key => $value) {
        if ($key === 'foto_perfil') {
            $usuario[$key] = base64_encode($value); // Codificar en base64
        } else {
            $usuario[$key] = $value;
        }
    }
    $usuarios[] = $usuario;
}

echo json_encode([
    'encontrado' => !empty($usuarios),
    'usuarios' => $usuarios
]);