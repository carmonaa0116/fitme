<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Obtener el JSON con el nombre del ejercicio
$data = json_decode(file_get_contents("php://input"), true);

// Verificar que el nombre del ejercicio esté presente
if (isset($data['nombreEjercicio'])) {
    $nombreEjercicio = $data['nombreEjercicio'];

    // Consultar la base de datos para obtener el primer id del ejercicio que coincida con el nombre
    $sql = "SELECT id FROM ejercicios WHERE nombre = ? LIMIT 1";
    
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $nombreEjercicio);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si se encontró un ejercicio con el nombre proporcionado
    if ($resultado->num_rows > 0) {
        // Obtener el id del ejercicio
        $ejercicio = $resultado->fetch_assoc();
        // Devolver el id en formato JSON
        echo json_encode($ejercicio);
    } else {
        // Si no se encuentra el ejercicio, devolver un error
        echo json_encode(["error" => "Ejercicio no encontrado"]);
    }

    $stmt->close();
} else {
    // Si no se pasa el nombre del ejercicio, devolver un error
    echo json_encode(["error" => "Nombre del ejercicio no proporcionado"]);
}

$conexion->close();
?>