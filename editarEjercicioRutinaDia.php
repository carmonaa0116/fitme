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

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['idRutina']) &&
    isset($data['dia_semana']) &&
    isset($data['idEjercicio']) &&
    isset($data['series']) &&
    isset($data['repeticionesInicio']) &&
    isset($data['repeticionesFin']) &&
    isset($data['peso'])
) {
    $idRutina = $data['idRutina'];
    $dia_semana = $data['dia_semana'];
    $idEjercicio = $data['idEjercicio'];
    $series = $data['series'];
    $repeticionesInicio = $data['repeticionesInicio'];
    $repeticionesFin = $data['repeticionesFin'];
    $peso = $data['peso'];

    $sql = "UPDATE ejercicios_rutina 
            SET idEjercicio = ?, series = ?, repeticionesInicio = ?, repeticionesFin = ?, peso = ?
            WHERE idRutina = ? AND dia_semana = ?";

    $stmt = $conexion->prepare($sql);
    if ($stmt === false) {
        echo json_encode(['error' => 'Error en la preparación de la consulta']);
        exit;
    }

    $stmt->bind_param("iiiiiss", $idEjercicio, $series, $repeticionesInicio, $repeticionesFin, $peso, $idRutina, $dia_semana);
    $success = $stmt->execute();

    if ($success) {
        echo json_encode(['mensaje' => 'Ejercicio actualizado correctamente']);
    } else {
        echo json_encode(['error' => 'Error al actualizar el ejercicio']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}

$conexion->close();
?>
