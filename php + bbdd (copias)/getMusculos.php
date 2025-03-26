<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: http://localhost:4321"); // Permitir solicitudes desde el frontend en el puerto 4321
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir estos métodos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir estos encabezados
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';

$conexion = $conn;

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

// Ejecutar la consulta
$query = "SELECT * FROM musculos ORDER BY nombre";
$result = $conexion->query($query);

if ($result->num_rows > 0) {
    $musculos = array();
    while ($row = $result->fetch_assoc()) {
        $musculos[] = $row;
    }
    echo json_encode($musculos);
} else {
    echo json_encode(['error' => 'No se encontraron musculos']);
}
