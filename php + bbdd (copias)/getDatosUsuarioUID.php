<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Obtener el JSON con el uid
$data = json_decode(file_get_contents("php://input"), true);
if (is_null($data)) {
    echo json_encode(["error" => "JSON no válido o vacío"]);
    exit;
}
if (isset($data['uid'])) {
    $uid = $data['uid'];

    $sql = "SELECT 
    u.id,
    u.nombre_usuario,
    u.nombre,
    u.sexo,
    u.fecha_nacimiento,
    u.experiencia,
    u.altura,
    u.peso,
    u.fecha_registro,
    u.email,
    u.foto_perfil,
    u.n_registros,
    u.uid,
    u.provider,
    vu.n_amigos AS n_amigos,
    ru.total_rutinas AS n_rutinas
FROM 
    usuarios u
JOIN 
    vista_usuarios vu ON u.id = vu.id
LEFT JOIN 
    rutinas_usuario ru ON u.id = ru.id_usuario
WHERE 
    uid = ?;";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($usuario = $resultado->fetch_assoc()) {
        // Procesar foto_perfil (puede ser null)
        if (!is_null($usuario['foto_perfil'])) {
            $usuario['foto_perfil'] = base64_encode($usuario['foto_perfil']);
        } else {
            $usuario['foto_perfil'] = null;
        }
        echo json_encode($usuario);
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Falta parámetro uid"]);
}

$conexion->close();
