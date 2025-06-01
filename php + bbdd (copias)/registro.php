<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include 'conexion.php';

session_start();

try {
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos) {
        echo json_encode(['mensaje' => false, 'error' => 'No se recibieron datos válidos']);
        exit;
    }

    // Limpiar espacios innecesarios
    $datos['nombre_usuario'] = trim($datos['nombre_usuario'] ?? '');
    $datos['nombre'] = trim($datos['nombre'] ?? '');
    $datos['email'] = trim($datos['email'] ?? '');
    $datos['sexo'] = trim($datos['sexo'] ?? '');
    $datos['fecha_nacimiento'] = trim($datos['fecha_nacimiento'] ?? '');
    $datos['experiencia'] = trim($datos['experiencia'] ?? '');
    $datos['uid'] = trim($datos['uid'] ?? '');
    $datos['altura'] = $datos['altura'] ?? null;
    $datos['peso'] = $datos['peso'] ?? null;

    // Validaciones básicas
    if (
        strlen($datos['nombre_usuario']) < 4 ||
        empty($datos['nombre']) ||
        !filter_var($datos['email'], FILTER_VALIDATE_EMAIL) ||
        empty($datos['sexo']) ||
        empty($datos['fecha_nacimiento']) ||
        empty($datos['experiencia']) ||
        !is_numeric($datos['altura']) ||
        !is_numeric($datos['peso']) ||
        empty($datos['uid'])
    ) {
        echo json_encode(['mensaje' => false, 'error' => 'Datos inválidos o incompletos']);
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

    // Insertar el nuevo usuario en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (uid, nombre_usuario, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssssdd",
        $datos['uid'],
        $datos['nombre_usuario'],
        $datos['nombre'],
        $datos['email'],
        $datos['sexo'],
        $datos['fecha_nacimiento'],
        $datos['experiencia'],
        $datos['altura'],
        $datos['peso']
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
?>
