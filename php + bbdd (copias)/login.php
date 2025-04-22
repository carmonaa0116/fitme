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
    if (empty($datos['nombre_usuario']) || empty($datos['contrasena'])) {
        echo json_encode(['mensaje' => false, 'error' => 'Faltan datos']);
        exit;
    }

    // Buscar el usuario en la base de datos
    $stmt = $conn->prepare("SELECT id, nombre_usuario, contrasena, nombre, email, sexo, fecha_nacimiento, experiencia, altura, peso FROM usuarios WHERE nombre_usuario = ?");
    $stmt->bind_param("s", $datos['nombre_usuario']);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si el usuario existe
    if ($resultado->num_rows == 0) {
        echo json_encode(['mensaje' => false, 'error' => 'Usuario no encontrado']);
        exit;
    }

    // Obtener los datos del usuario
    $usuario = $resultado->fetch_assoc();

    // Verificar la contraseña
    if (!password_verify($datos['contrasena'], $usuario['contrasena'])) {
        echo json_encode(['mensaje' => false, 'error' => 'Contraseña incorrecta']);
        exit;
    }

    // Convertir todos los valores del usuario a string
    foreach ($usuario as $key => $value) {
        $usuario[$key] = strval($value);
    }

    // Almacenar los datos del usuario en la sesión
    $_SESSION['usuario'] = $usuario;

    // Devolver los datos del usuario
    echo json_encode(['mensaje' => true, 'usuario' => $usuario]);

} catch (Exception $e) {
    echo json_encode(['mensaje' => false, 'error' => $e->getMessage()]);
}
?>
