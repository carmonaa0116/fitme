<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Obtener el JSON con el idRutina y el dia_semana
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['idRutina']) && isset($data['dia_semana'])) {
    $idRutina = $data['idRutina'];
    $diaSemana = $data['dia_semana'];

    $sql = "SELECT ej.nombre, ejr.series, ejr.repeticionesInicio, ejr.repeticionesFin, ejr.peso 
            FROM ejercicios_rutina ejr 
            JOIN ejercicios ej ON ejr.idEjercicio = ej.id 
            WHERE ejr.dia_semana = ? AND ejr.idRutina = ?;";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("si", $diaSemana, $idRutina);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $ejercicios = [];

    while ($fila = $resultado->fetch_assoc()) {
        $ejercicios[] = $fila;
    }

    echo json_encode(["ejercicios" => $ejercicios]);

    $stmt->close();
} else {
    echo json_encode(["error" => "Faltan parámetros (idRutina o dia_semana)"]);
}

$conexion->close();
?>
