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

// Obtener el cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id_usuario'])) {
    echo json_encode(['error' => 'ID de usuario no proporcionado']);
    exit;
}

$id_usuario = $conexion->real_escape_string($input['id_usuario']);

// Consulta para obtener los datos del usuario
$query = "SELECT 
    id, 
    nombre_usuario,  
    nombre, 
    sexo, 
    fecha_nacimiento, 
    experiencia, 
    altura, 
    peso, 
    fecha_registro, 
    email, 
    foto_perfil 
FROM 
    usuarios 
WHERE 
    id = $id_usuario";

$result = $conexion->query($query);

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();

    // Convertir el blob de foto_perfil a base64
    if (!is_null($usuario['foto_perfil'])) {
        $usuario['foto_perfil'] = base64_encode($usuario['foto_perfil']);
    }

    echo json_encode(['usuario' => $usuario]);
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}
?>