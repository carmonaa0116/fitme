<?php
// insertarEjercicioRutinaDia.php

// Incluir el archivo de conexión
require_once 'conexion.php';

// Establecer el encabezado para recibir JSON
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Leer el cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibieron los datos necesarios
$requiredFields = ['idRutina', 'dia_semana', 'idEjercicio', 'series', 'repeticionesInicio', 'repeticionesFin', 'peso'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (!isset($input[$field])) {
        $missingFields[] = $field;
    }
}

if (count($missingFields) === 0) { // Verificar si no hay campos faltantes
    $idRutina = intval($input['idRutina']);
    $dia_semana = $input['dia_semana'];
    $idEjercicio = intval($input['idEjercicio']);
    $series = intval($input['series']);
    $repeticionesInicio = intval($input['repeticionesInicio']);
    $repeticionesFin = intval($input['repeticionesFin']);
    $peso = floatval($input['peso']);

    // Preparar la consulta para insertar los datos
    $query = "INSERT INTO ejercicios_rutina (idRutina, dia_semana, idEjercicio, series, repeticionesInicio, repeticionesFin, peso) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("isiiiid", $idRutina, $dia_semana, $idEjercicio, $series, $repeticionesInicio, $repeticionesFin, $peso);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Ejercicio insertado correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al insertar el ejercicio."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta."]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos proporcionados.",
        "missingFields" => $missingFields
    ]);
}

// Cerrar la conexión
$conn->close();