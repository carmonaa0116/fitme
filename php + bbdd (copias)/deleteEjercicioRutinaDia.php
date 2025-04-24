<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id_rutina'], $input['dia_semana'], $input['idEjercicio'])) {
    $id_rutina = intval($input['id_rutina']);
    $dia_semana = trim($input['dia_semana']);
    $idEjercicio = intval($input['idEjercicio']);

    $query = "DELETE FROM ejercicios_rutina WHERE idRutina = ? AND dia_semana = ? AND idEjercicio = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("isi", $id_rutina, $dia_semana, $idEjercicio);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true, "message" => "Ejercicio eliminado correctamente de la rutina."]);
            } else {
                echo json_encode(["success" => false, "message" => "No se encontró coincidencia para eliminar."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al ejecutar la eliminación."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Parámetros no proporcionados."]);
}

$conn->close();
