<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

$usuarioId = $_GET["usuario_id"] ?? $_GET["usuarios_id"] ?? null;

if (!$usuarioId || !is_numeric($usuarioId)) {
    http_response_code(400);
    echo json_encode(["erro" => "ID de usuário inválido."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT atracao_id FROM favoritos WHERE usuario_id = :usuario_id");
    $stmt->execute([":usuario_id" => (int)$usuarioId]);
    $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode(array_values(array_map("strval", $ids ?: [])));
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao buscar favoritos: " . $e->getMessage()]);
}