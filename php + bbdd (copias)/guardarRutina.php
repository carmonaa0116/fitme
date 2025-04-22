<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['usuario_id']) || !isset($data['rutina'])) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit;
}

$usuario_id = intval($data['usuario_id']);
$rutina_json = json_encode($data['rutina'], JSON_UNESCAPED_UNICODE);

// Conexión a la BD
$conexion = new mysqli("localhost", "usuario", "contraseña", "basededatos");
if ($conexion->connect_error) {
    echo json_encode(["success" => false, "error" => "Error de conexión"]);
    exit;
}

// Inserción
$stmt = $conexion->prepare("INSERT INTO rutinas_ia (usuario_id, rutina) VALUES (?, ?)");
$stmt->bind_param("is", $usuario_id, $rutina_json);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conexion->close();
?>
