<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
$conexion = $conn;

session_start();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['uid']) && isset($data['email'])) {
    $uid = $data['uid'];
    $email = $data['email'];

    $sql = "SELECT * FROM usuarios WHERE uid = ? OR email = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $uid, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // Sumar 1 al campo n_registros
        $updateSql = "UPDATE usuarios SET n_registros = n_registros + 1 WHERE uid = ?";
        $updateStmt = $conexion->prepare($updateSql);
        $updateStmt->bind_param("s", $uid);
        $updateStmt->execute();
        $updateStmt->close();

        // Convertir foto_perfil a base64 si existe
        if (!empty($row['foto_perfil'])) {
            $row['foto_perfil'] = base64_encode($row['foto_perfil']);
        }

        echo json_encode(["found" => true]);
    } else {
        echo json_encode(["found" => false]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "UID o email no proporcionado"]);
}

$conexion->close();
?>
