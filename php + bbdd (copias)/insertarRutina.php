<?php
// Archivo: insertarRutina.php
header("Access-Control-Allow-Origin: http://localhost:4321"); // Permitir solicitudes desde el frontend en el puerto 4321
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir estos métodos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir estos encabezados
header('Content-Type: application/json; charset=utf-8');
// Incluir la conexión a la base de datos
require_once 'conexion.php'; // Asegúrate de que este archivo contiene la conexión $conn
// Obtener los datos en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibieron los parámetros necesarios
if (isset($data['nombre']) && isset($data['dias']) && isset($data['id_usuario'])) {
    $nombre = $conn->real_escape_string($data['nombre']);
    $dias = $conn->real_escape_string(implode(',', $data['dias'])); // Convertir array a string separado por comas
    $id_usuario = (int)$data['id_usuario'];

    // Insertar en la tabla rutina
    $sql = "INSERT INTO rutinas (idUsuario, nombre, dias) VALUES ('$id_usuario', '$nombre', '$dias')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Rutina insertada correctamente.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al insertar la rutina: ' . $conn->error
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Faltan parámetros necesarios.'
    ]);
}

$conn->close();
