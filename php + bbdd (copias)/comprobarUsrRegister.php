<?php
header("Access-Control-Allow-Origin: http://localhost:4321"); // Permitir solicitudes desde el frontend en el puerto 4321
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir estos métodos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir estos encabezados
header('Content-Type: application/json; charset=utf-8');

// Establecer conexión con la base de datos
// Crear la conexión
require_once 'conexion.php'; // Asegúrate de que este archivo contenga la conexión a la base de datos

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    echo json_encode(['mensaje' => false, 'error' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
}

try {
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos || !isset($datos['nombre_usuario'])) {
        echo json_encode(['mensaje' => false, 'error' => 'No se recibieron datos válidos']);
        exit;
    }

    // Obtener el nombre de usuario
    $nombre_usuario = $datos['nombre_usuario'];

    // Consultar si el nombre de usuario ya existe
    $stmt = $conn->prepare("SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ?");
    $stmt->bind_param("s", $nombre_usuario);  // "s" indica que el parámetro es una cadena

    $stmt->execute();
    $stmt->store_result(); // Guardar el resultado para poder comprobar si se encuentra

    if ($stmt->num_rows > 0) {
        // Si ya existe un usuario con ese nombre
        echo json_encode(['mensaje' => false, 'usuario_existe' => true]);
    } else {
        // Si no existe el usuario
        echo json_encode(['mensaje' => true, 'usuario_existe' => false]);
    }

    $stmt->close(); // Cerrar la sentencia
    $conn->close(); // Cerrar la conexión

} catch (Exception $e) {
    // En caso de error
    echo json_encode(['mensaje' => false, 'error' => $e->getMessage()]);
}
