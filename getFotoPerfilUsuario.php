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

    // Consultar la base de datos para obtener el campo foto_perfil
    $sql = "SELECT foto_perfil FROM usuarios WHERE id = ?";
    
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si se encontró un usuario con el id proporcionado
    if ($resultado->num_rows > 0) {
        // Obtener el campo foto_perfil
        $usuario = $resultado->fetch_assoc();
        // Devolver los datos en formato JSON
        echo json_encode(["foto_perfil" => base64_encode($usuario['foto_perfil'])]);
    } else {
        // Si no se encuentra el usuario, devolver un error
        echo json_encode(["foto_perfil" => "null", "error" => "Usuario no encontrado"]);
    }

    $stmt->close();
} else {
    // Si no se pasa el idUsuario, devolver un error
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
}

$conexion->close();
?>
