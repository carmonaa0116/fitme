<?php
// Archivo: /C:/xampp/htdocs/php-fitme/getRutina.php

header("Access-Control-Allow-Origin: http://localhost:4321"); // Permitir solicitudes desde el frontend en el puerto 4321
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir estos métodos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir estos encabezados
header('Content-Type: application/json; charset=utf-8');

// Incluir el archivo de conexión
require_once 'conexion.php';
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['id'])) {
    echo json_encode(["error" => "ID no proporcionado"]);
    exit;
} else {
    $id = $data['id'];

    // Preparar la consulta
    $sql = "SELECT * FROM rutinas WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $rutina = $result->fetch_assoc();
        echo json_encode(["rutina" => $rutina]);
    } else {
        echo json_encode(["error" => "Rutina no encontrada"]);
    }
}



$stmt->close();
$conn->close();
