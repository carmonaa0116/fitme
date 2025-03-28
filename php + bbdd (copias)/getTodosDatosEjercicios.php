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
$query = "SELECT 
    e.id AS id, 
    e.nombre AS nombre, 
    e.imagen AS imagen, 
    e.video AS video, 
    m.nombre AS musculo
FROM 
    ejercicios e 
JOIN 
    ejercicio_musculo em ON em.ejercicio_id = e.id 
JOIN 
    musculos m ON em.musculo_id = m.id
ORDER BY 
    e.id;
";

$result = $conexion->query($query);

if ($result->num_rows > 0) {
    $ejercicios = array();
    while ($row = $result->fetch_assoc()) {
        $id_ejercicio = $row['id'];

        // Si el ejercicio ya está en el array, solo agregamos el músculo
        if (!isset($ejercicios[$id_ejercicio])) {
            $ejercicios[$id_ejercicio] = [
                'id' => $id_ejercicio,
                'nombre' => $row['nombre'],
                'imagen' => $row['imagen'],  // Suponiendo que es una URL
                'video' => $row['video'],
                'musculos' => [] // Inicializar como array vacío
            ];
        }

        // Agregar el músculo al array
        $ejercicios[$id_ejercicio]['musculos'][] = $row['musculo'];
    }

    // Reindexar el array para obtener una lista ordenada
    echo json_encode(['ejercicios' => array_values($ejercicios)]);
} else {
    echo json_encode(['error' => 'No se encontraron ejercicios']);
}
?>
