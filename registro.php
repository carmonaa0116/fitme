<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include 'conexion.php'; // Aquí tomamos la conexión desde conexion.php

session_start(); // Inicia la sesión

try {
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos) {
        echo json_encode(['mensaje' => false, 'error' => 'No se recibieron datos válidos']);
        exit;
    }

    // Validaciones básicas
    if (
        strlen($datos['nombre_usuario']) < 4 ||
        empty($datos['contrasena']) || 
        empty($datos['nombre']) ||
        empty($datos['sexo']) ||
        empty($datos['fecha_nacimiento']) ||
        empty($datos['experiencia']) ||
        empty($datos['email']) ||  // Validación del email
        !is_numeric($datos['altura']) ||
        !is_numeric($datos['peso'])
    ) {
        echo json_encode(['mensaje' => false, 'error' => 'Datos inválidos']);
        exit;
    }

    // Comprobar si ya existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE nombre_usuario = ? OR email = ?");
    $stmt->bind_param("ss", $datos['nombre_usuario'], $datos['email']);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['mensaje' => false, 'error' => 'El usuario o el correo electrónico ya existen']);
        exit;
    }

    // Encriptar contraseña
    $contrasenaHash = password_hash($datos['contrasena'], PASSWORD_DEFAULT);

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre_usuario, contrasena, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", 
        $datos['nombre_usuario'], 
        $contrasenaHash, 
        $datos['nombre'], 
        $datos['email'], 
        $datos['sexo'], 
        $datos['fecha_nacimiento'], 
        $datos['experiencia'], 
        $datos['altura'], 
        $datos['peso']
    );
    $stmt->execute();

    // Obtener datos del usuario recién insertado
    $id = $conn->insert_id;
    $stmt = $conn->prepare("SELECT id, nombre_usuario, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $usuario = $resultado->fetch_assoc();

    // Guardar los datos del usuario en la sesión
    $_SESSION['usuario'] = $usuario;

    echo json_encode(['mensaje' => true, 'usuario' => $usuario]);

} catch (Exception $e) {
    echo json_encode(['mensaje' => false, 'error' => $e->getMessage()]);
}
?>
