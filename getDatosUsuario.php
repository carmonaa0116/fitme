<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Obtener el JSON con el idUsuario
$data = json_decode(file_get_contents("php://input"), true);

// Verificar que el idUsuario esté presente
if (isset($data['idUsuario'])) {
    $idUsuario = $data['idUsuario'];

    // Consultar la base de datos para obtener los datos del usuario
    $sql = "SELECT id, nombre_usuario, nombre, sexo, fecha_nacimiento, experiencia, altura, peso, fecha_registro, email 
            FROM usuarios WHERE id = ?";
    
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si se encontró un usuario con el id proporcionado
    if ($resultado->num_rows > 0) {
        // Obtener los datos del usuario
        $usuario = $resultado->fetch_assoc();
        // Devolver los datos en formato JSON
        echo json_encode($usuario);
    } else {
        // Si no se encuentra el usuario, devolver un error
        echo json_encode(["error" => "Usuario no encontrado"]);
    }

    $stmt->close();
} else {
    // Si no se pasa el idUsuario, devolver un error
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
}

$conexion->close();
?>
