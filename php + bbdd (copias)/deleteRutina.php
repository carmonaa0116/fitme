<?php
// deleteRutina.php

// Incluir el archivo de conexión
require_once 'conexion.php';

// Establecer el encabezado para recibir JSON
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Leer el cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Verificar si se recibió el ID
if (isset($input['id'])) {
    $id = intval($input['id']);

    // Preparar la consulta para eliminar la fila correspondiente
    $query = "DELETE FROM rutinas WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Rutina eliminada correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al eliminar la rutina."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no proporcionado."]);
}

// Cerrar la conexión
$conn->close();
