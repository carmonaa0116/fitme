<?php
// Activar CORS
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once 'conexion.php';
$conexion = $conn;

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
    exit;
}

// Comprobación de existencia de los campos requeridos
$campos_requeridos = ['nombre_usuario', 'nombre', 'email', 'fecha_nacimiento', 'sexo', 'experiencia', 'altura', 'peso'];
$faltan_campos = array_filter($campos_requeridos, fn($campo) => !isset($_POST[$campo]));

if (!empty($faltan_campos)) {
    echo json_encode([
        'error' => 'Datos incompletos',
        'faltantes' => array_values($faltan_campos)
    ]);
    exit;
}

// Asignación de datos
$nombre_usuario = $_POST['nombre_usuario'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];
$sexo = $_POST['sexo'];
$experiencia = $_POST['experiencia'];
$altura = $_POST['altura'];
$peso = $_POST['peso'];

// Verificar si se ha subido una imagen nueva
$foto_perfil_binario = null;
$hay_imagen_nueva = isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK;

if ($hay_imagen_nueva) {
    $archivo = $_FILES['foto_perfil'];

    // Validación adicional opcional: tipo MIME, tamaño, etc.
    $foto_perfil_binario = file_get_contents($archivo['tmp_name']);
}

// Construcción dinámica de la consulta SQL
if ($hay_imagen_nueva) {
    $sql = "UPDATE usuarios 
            SET nombre = ?, email = ?, fecha_nacimiento = ?, sexo = ?, experiencia = ?, altura = ?, peso = ?, foto_perfil = ?
            WHERE nombre_usuario = ?";
    $stmt = $conexion->prepare($sql);

    if ($stmt === false) {
        echo json_encode(['error' => 'Error en la preparación de la consulta con imagen']);
        exit;
    }

    $stmt->bind_param(
        "sssssdsss",
        $nombre,
        $email,
        $fecha_nacimiento,
        $sexo,
        $experiencia,
        $altura,
        $peso,
        $foto_perfil_binario,
        $nombre_usuario
    );
} else {
    $sql = "UPDATE usuarios 
            SET nombre = ?, email = ?, fecha_nacimiento = ?, sexo = ?, experiencia = ?, altura = ?, peso = ?
            WHERE nombre_usuario = ?";
    $stmt = $conexion->prepare($sql);

    if ($stmt === false) {
        echo json_encode(['error' => 'Error en la preparación de la consulta sin imagen']);
        exit;
    }

    $stmt->bind_param(
        "sssssdss",
        $nombre,
        $email,
        $fecha_nacimiento,
        $sexo,
        $experiencia,
        $altura,
        $peso,
        $nombre_usuario
    );
}

// Ejecutar consulta
$success = $stmt->execute();

if ($success) {
    echo json_encode(['mensaje' => 'Usuario actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar el usuario']);
}

$stmt->close();
$conexion->close();
?>
