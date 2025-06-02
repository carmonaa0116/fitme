<?php
header("Access-Control-Allow-Origin: http://localhost:4321"); // Permitir solicitudes desde el frontend en el puerto 4321
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir estos métodos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir estos encabezados
header('Content-Type: application/json; charset=utf-8');

// Conectar a la base de datos
$servername = "localhost";
$username = "usuario"; // Reemplaza con tu usuario de MySQL
$password = "contraseña"; // Reemplaza con tu contraseña de MySQL
$dbname = "nombre_base_de_datos"; // Reemplaza con el nombre de tu base de datos

// Crear conexión
require_once 'conexion.php'; // Asegúrate de que este archivo establezca $conn correctamente

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Obtener los datos de la solicitud
$data = json_decode(file_get_contents("php://input"));
$id_usuario = $data->id_usuario;

// Preparar la consulta SQL para obtener las rutinas del usuario
$sql = "SELECT * FROM rutinas WHERE idUsuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario); // "i" significa que el parámetro es un entero
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontraron rutinas
if ($result->num_rows > 0) {
    $rutinas = [];
    while ($row = $result->fetch_assoc()) {
        // Almacenar cada rutina en el array
        $rutinas[] = [
            "id" => $row["id"],
            "nombre" => $row["nombre"],
            "dias" => explode(',', $row["dias"]), // Convertir el string de días a un array
            // Puedes agregar más campos si es necesario
        ];
    }
    // Devolver las rutinas en formato JSON
    echo json_encode($rutinas);
} else {
    echo json_encode(["mensaje" => "Todavía no tienes rutinas creadas."]);
}

// Cerrar la conexión
$conn->close();
?>
