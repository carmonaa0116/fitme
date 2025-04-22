<?php
header("Access-Control-Allow-Origin: http://localhost:4321");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexion.php'; // Asegúrate de que este archivo establezca $conn correctamente

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['prompt'])) {
    echo json_encode(["error" => "No se ha recibido el prompt."]);
    exit();
}

$prompt = $data['prompt'];
$usuario_id = $data['usuario_id'] ?? null;

// Preparar datos para Groq API
$apiData = [
    "model" => "llama-3.3-70b-versatile",
    "messages" => [
        ["role" => "user", "content" => $prompt]
    ]
];

// Consulta a Groq
$response = consulta_api(json_encode($apiData));

// Verificamos la respuesta
if (!isset($response['texto'])) {
    echo json_encode([ 
        "error" => "Error al generar la rutina.",
        "detalle" => $response
    ]);
    exit();
}

// Limpiamos la respuesta de la IA (eliminamos las comillas triples y posibles saltos de línea)
$rutina_json = trim($response['texto']);
$rutina_json = preg_replace('/^```[\s\S]*```$/', '', $rutina_json); // Eliminamos las comillas triples

// Intentamos decodificar como JSON
$decoded_rutina = json_decode($rutina_json, true);

if (!$decoded_rutina) {
    echo json_encode([ 
        "error" => "La respuesta de la IA no es un JSON válido.",
        "respuesta" => $rutina_json
    ]);
    exit();
}

// Guardamos en base de datos
$sql = "INSERT INTO rutinas (usuario_id, rutina) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
    exit();
}

$stmt->bind_param("is", $usuario_id, $rutina_json);

if ($stmt->execute()) {
    echo json_encode($decoded_rutina); // Devolvemos la rutina estructurada
} else {
    echo json_encode(["error" => "Error al guardar la rutina: " . $stmt->error]);
}

$stmt->close();
$conn->close();

// Función de consulta a Groq
function consulta_api($data)
{
    $url = "https://api.groq.com/openai/v1/chat/completions"; // URL de la nueva API
    $apiKey = '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'; // Reemplaza con tu API Key de Groq

    if (empty($apiKey)) {
        return ["error" => "API Key no proporcionada"];
    }

    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($statusCode === 200) {
        $result = json_decode($response, true);

        if (isset($result["choices"][0]["message"]["content"])) {
            return [
                "texto" => $result["choices"][0]["message"]["content"],
                "coste" => $result["usage"] ?? null
            ];
        }

        return ["error" => "Respuesta sin contenido esperado", "raw" => $response];
    }

    // Si no es 200, es un error
    return [
        "error" => "Error en consulta a Groq",
        "status" => $statusCode,
        "raw" => $response
    ];
}