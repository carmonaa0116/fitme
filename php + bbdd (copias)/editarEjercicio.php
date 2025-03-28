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
if (!isset($_POST['id']) || !isset($_POST['nombre']) || !isset($_POST['video']) || !isset($_POST['musculos'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$video = $_POST['video'];

// Decodificar los músculos (vienen en formato JSON)
$musculos = json_decode($_POST['musculos'], true);
if (!$musculos) {
    echo json_encode(['error' => 'Error al decodificar los músculos']);
    exit;
}

// Verificar si el archivo es una imagen válida
$imagenFile = $_FILES['imagen'] ?? null;
$imagenTmpPath = $imagenFile['tmp_name'] ?? null;

if ($imagenFile && $imagenFile['size'] > 0) {
    $imagenNombre = uniqid() . '-' . basename($imagenFile['name']);
    $uploadDir = 'C:/Dev/fitme/uploads/';  // Ruta absoluta del directorio uploads
    $uploadPath = $uploadDir . $imagenNombre;

    // Asegúrate de que el directorio de subida exista
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Mover la imagen a la carpeta de subida
    if (move_uploaded_file($imagenTmpPath, $uploadPath)) {
        $sql = "UPDATE ejercicios SET nombre = ?, video = ?, imagen = ? WHERE id = ?";
    } else {
        echo json_encode(['error' => 'Error al mover la imagen al servidor.']);
        exit;
    }
} else {
    $sql = "UPDATE ejercicios SET nombre = ?, video = ? WHERE id = ?";
}

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit;
}

if ($imagenFile && $imagenFile['size'] > 0) {
    $stmt->bind_param("sssi", $nombre, $video, $imagenNombre, $id);
} else {
    $stmt->bind_param("ssi", $nombre, $video, $id);
}

if ($stmt->execute()) {
    // Actualizar los músculos en la tabla intermedia
    $stmt->close();
    $sqlMusculo = "DELETE FROM ejercicio_musculo WHERE ejercicio_id = ?";
    $stmtMusculo = $conexion->prepare($sqlMusculo);

    if ($stmtMusculo) {
        $stmtMusculo->bind_param("i", $id);
        $stmtMusculo->execute();
        $stmtMusculo->close();

        foreach ($musculos as $musculo_id) {
            $sqlMusculo = "INSERT INTO ejercicio_musculo (ejercicio_id, musculo_id) VALUES (?, ?)";
            $stmtMusculo = $conexion->prepare($sqlMusculo);

            if ($stmtMusculo) {
                $stmtMusculo->bind_param("ii", $id, $musculo_id);
                $stmtMusculo->execute();
                $stmtMusculo->close();
            }
        }

        echo json_encode(['mensaje' => 'Ejercicio actualizado correctamente']);
    } else {
        echo json_encode(['error' => 'Error al actualizar los músculos del ejercicio: ' . ($stmtMusculo ? $stmtMusculo->error : $conexion->error)]);
    }
} else {
    echo json_encode(['error' => 'Error al actualizar el ejercicio: ' . $stmt->error]);
}

// Cerrar la conexión
$conexion->close();
exit;
?>


