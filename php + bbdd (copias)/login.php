<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include 'conexion.php';
session_start();

try {
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos) {
        echo json_encode(['mensaje' => false, 'error' => 'No se recibieron datos válidos']);
        exit;
    }

    if (empty($datos['nombre_usuario']) || empty($datos['password'])) {
        echo json_encode(['mensaje' => false, 'error' => 'Faltan datos']);
        exit;
    }

    // 1. Buscar usuario por nombre_usuario
    $stmt = $conn->prepare("
        SELECT 
            u.id,
            u.nombre_usuario,
            u.password,
            u.nombre,
            u.email,
            u.sexo,
            u.fecha_nacimiento,
            u.experiencia,
            u.altura,
            u.peso,
            u.fecha_registro,
            u.foto_perfil,
            u.n_registros,
            u.uid,
            u.provider,
            ru.total_rutinas AS n_rutinas,
            vu.n_amigos
        FROM usuarios u
        LEFT JOIN rutinas_usuario ru ON u.id = ru.id_usuario
        LEFT JOIN vista_usuarios vu ON u.id = vu.id
        WHERE u.nombre_usuario = ?
    ");
    $stmt->bind_param("s", $datos['nombre_usuario']);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        echo json_encode(['mensaje' => false, 'error' => 'Usuario no encontrado']);
        exit;
    }

    $usuario = $resultado->fetch_assoc();

    // 2. Verificar contraseña
    if (!password_verify($datos['password'], $usuario['password'])) {
        echo json_encode(['mensaje' => false, 'error' => 'Contraseña incorrecta']);
        exit;
    }

    // 3. Incrementar el contador n_registros
    $nuevoRegistro = intval($usuario['n_registros']) + 1;

    $updateStmt = $conn->prepare("UPDATE usuarios SET n_registros = ? WHERE id = ?");
    $updateStmt->bind_param("ii", $nuevoRegistro, $usuario['id']);
    $updateStmt->execute();
    $updateStmt->close();

    $usuario['n_registros'] = strval($nuevoRegistro);

    // 4. Convertir todos los valores a string o null
    foreach ($usuario as $key => $value) {
        $usuario[$key] = is_null($value) ? null : strval($value);
    }

    // 5. Crear sesión
    $_SESSION['usuario'] = $usuario;

    echo json_encode(['mensaje' => true, 'usuario' => $usuario]);
} catch (Exception $e) {
    echo json_encode(['mensaje' => false, 'error' => $e->getMessage()]);
}
