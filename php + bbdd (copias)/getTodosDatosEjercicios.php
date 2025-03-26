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
$query = "SELECT * FROM ejercicios";
$result = $conexion->query($query);

if ($result->num_rows > 0) {
    $ejercicios = array();
    while ($row = $result->fetch_assoc()) {
        // Convertir el BLOB de la imagen a base64
        $imagenBase64 = base64_encode("data:image/jpeg;base64,".$row['imagen']);
        
        // Añadir los datos del ejercicio (con la imagen en base64 y el video como URL)
        $ejercicios[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'imagen' => $imagenBase64,  // La imagen como base64
            'video' => $row['video']   // El enlace al video de YouTube
        );
    }
    echo json_encode(['ejercicios' => $ejercicios]);
} else {
    echo json_encode(['error' => 'No se encontraron ejercicios']);
}


