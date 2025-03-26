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

// Verificar si se recibieron los datos esperados
if (!isset($_FILES['imagen']) || !isset($_POST['nombre']) || !isset($_POST['video']) || !isset($_POST['musculos'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$nombre = $_POST['nombre'];
$video = $_POST['video'];

// Decodificar los músculos (vienen en formato JSON)
$musculos = json_decode($_POST['musculos'], true);
if (!$musculos) {
    echo json_encode(['error' => 'Error al decodificar los músculos']);
    exit;
}

// Verificar si el archivo es una imagen válida
$imagenFile = $_FILES['imagen'];
$imagenTmpPath = $imagenFile['tmp_name'];

if (!file_exists($imagenTmpPath)) {
    echo json_encode(['error' => 'No se ha subido ninguna imagen']);
    exit;
}

$imagenContent = file_get_contents($imagenTmpPath); // Cargar contenido binario

// Insertar el ejercicio en la base de datos
$sql = "INSERT INTO ejercicios (nombre, imagen, video) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

$stmt->bind_param("sss", $nombre, $imagenContent, $video);

if ($stmt->execute()) {
    $ejercicio_id = $stmt->insert_id; // Obtener el ID del ejercicio recién insertado

    // Insertar los músculos en la tabla intermedia
    $stmt->close();
    foreach ($musculos as $musculo_id) {
        $sqlMusculo = "INSERT INTO ejercicio_musculo (ejercicio_id, musculo_id) VALUES (?, ?)";
        $stmtMusculo = $conexion->prepare($sqlMusculo);

        if ($stmtMusculo) {
            $stmtMusculo->bind_param("ii", $ejercicio_id, $musculo_id);
            $stmtMusculo->execute();
            $stmtMusculo->close();
        }
    }

    echo json_encode(['mensaje' => 'Ejercicio insertado correctamente']);
} else {
    echo json_encode(['error' => 'Error al insertar el ejercicio: ' . $stmt->error]);
}

// Cerrar la conexión
$conexion->close();
exit;
?>
