<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

// Consulta para obtener las 3 rutinas más visitadas junto con los datos del usuario (no sensibles)
$sql = "SELECT 
            r.id AS rutina_id,
            r.nombre AS rutina_nombre,
            r.dias,
            r.privacidad,
            r.visitas,
            u.id AS usuario_id,
            u.nombre_usuario,
            u.nombre AS usuario_nombre,
            u.sexo,
            u.experiencia,
            u.foto_perfil
        FROM rutinas r
        LEFT JOIN usuarios u ON r.idUsuario = u.id
        ORDER BY r.visitas DESC
        LIMIT 3";

$result = $conexion->query($sql);

$topRutinas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Si hay foto_perfil, la convertimos a base64, si no, null
        $foto_perfil = isset($row['foto_perfil']) && $row['foto_perfil'] !== null
            ? base64_encode($row['foto_perfil'])
            : null;

        $topRutinas[] = [
            "rutina" => [
                "id" => $row['rutina_id'],
                "nombre" => $row['rutina_nombre'],
                "dias" => $row['dias'],
                "privacidad" => $row['privacidad'],
                "visitas" => $row['visitas']
            ],
            "usuario" => [
                "id" => $row['usuario_id'],
                "nombre_usuario" => $row['nombre_usuario'],
                "nombre" => $row['usuario_nombre'],
                "sexo" => $row['sexo'],
                "experiencia" => $row['experiencia'],
                "foto_perfil" => $foto_perfil
            ]
        ];
    }
    echo json_encode($topRutinas);
} else {
    echo json_encode([]);
}

$conexion->close();
?>