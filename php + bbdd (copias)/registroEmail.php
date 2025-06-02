<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion.php';
session_start();

function safe_trim($value)
{
    return is_string($value) ? trim($value) : '';
}

try {
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos) {
        echo json_encode(['mensaje' => false, 'error' => 'No se recibieron datos válidos']);
        exit;
    }

    // Limpiar y preparar datos
    $datos['nombre_usuario'] = safe_trim($datos['nombre_usuario'] ?? '');
    $datos['nombre'] = safe_trim($datos['nombre'] ?? '');
    $datos['email'] = safe_trim($datos['email'] ?? '');
    $datos['sexo'] = safe_trim($datos['sexo'] ?? '');
    $datos['fecha_nacimiento'] = safe_trim($datos['fecha_nacimiento'] ?? '');
    $datos['experiencia'] = safe_trim($datos['experiencia'] ?? '');
    $datos['uid'] = safe_trim($datos['uid'] ?? '');
    $datos['password'] = safe_trim($datos['password'] ?? '');
    $datos['altura'] = $datos['altura'] ?? null;
    $datos['peso'] = $datos['peso'] ?? null;

    // Validación de campos
    $errores = [];

    if (strlen($datos['nombre_usuario']) < 4) {
        $errores['nombre_usuario'] = 'Debe tener al menos 4 caracteres';
    }
    if (empty($datos['nombre'])) {
        $errores['nombre'] = 'Campo obligatorio';
    }
    if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        $errores['email'] = 'Correo electrónico inválido';
    }
    if (empty($datos['sexo'])) {
        $errores['sexo'] = 'Campo obligatorio';
    }
    if (empty($datos['fecha_nacimiento'])) {
        $errores['fecha_nacimiento'] = 'Campo obligatorio';
    }
    if (empty($datos['experiencia'])) {
        $errores['experiencia'] = 'Campo obligatorio';
    }
    if (!isset($datos['altura']) || !is_numeric($datos['altura'])) {
        $errores['altura'] = 'Debe ser un número';
    }
    if (!isset($datos['peso']) || !is_numeric($datos['peso'])) {
        $errores['peso'] = 'Debe ser un número';
    }
    if (empty($datos['uid'])) {
        $errores['uid'] = 'Campo obligatorio';
    }
    if (empty($datos['password'])) {
        $errores['password'] = 'Campo obligatorio';
    }

    if (!empty($errores)) {
        echo json_encode([
            'mensaje' => false,
            'error' => 'Datos inválidos o incompletos',
            'campos_invalidos' => $errores
        ]);
        exit;
    }

    // Comprobar si el nombre de usuario ya existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE nombre_usuario = ?");
    $stmt->bind_param("s", $datos['nombre_usuario']);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['mensaje' => false, 'error' => 'El nombre de usuario ya existe']);
        exit;
    }
    $stmt->close();

    // Comprobar si el correo electrónico ya está registrado
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $datos['email']);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['mensaje' => false, 'error' => 'El correo electrónico ya está registrado']);
        exit;
    }
    $stmt->close();

    // Preparar variables para bind_param
    $uid = $datos['uid'];
    $nombre_usuario = $datos['nombre_usuario'];
    $nombre = $datos['nombre'];
    $email = $datos['email'];
    $sexo = $datos['sexo'];
    $fecha_nacimiento = $datos['fecha_nacimiento'];
    $experiencia = $datos['experiencia'];
    $altura = (float)$datos['altura'];
    $peso = (float)$datos['peso'];
    $provider = "email";
    $passwordHash = password_hash($datos['password'], PASSWORD_DEFAULT);

    // Insertar el nuevo usuario en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (uid, nombre_usuario, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso, provider, password) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssssddss",
        $uid,
        $nombre_usuario,
        $nombre,
        $email,
        $sexo,
        $fecha_nacimiento,
        $experiencia,
        $altura,
        $peso,
        $provider,
        $passwordHash
    );

    if (!$stmt->execute()) {
        echo json_encode(['mensaje' => false, 'error' => 'Error al insertar el usuario']);
        exit;
    }

    $id = $conn->insert_id;
    $stmt->close();

    // Obtener los datos recién insertados
    $stmt = $conn->prepare("SELECT id, uid, nombre_usuario, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $usuario = $resultado->fetch_assoc();

    $_SESSION['usuario'] = $usuario;

    echo json_encode(['mensaje' => true, 'usuario' => $usuario]);
} catch (Exception $e) {
    echo json_encode(['mensaje' => false, 'error' => $e->getMessage()]);
}
