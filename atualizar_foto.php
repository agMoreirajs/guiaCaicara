<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

$dados = json_decode(file_get_contents("php://input"), true) ?? [];
$usuario_id = (int)($dados["usuario_id"] ?? 0);
$foto_perfil = trim((string)($dados["foto_perfil"] ?? ""));

if ($usuario_id <= 0 || $foto_perfil === "") {
    http_response_code(400);
    echo json_encode(["erro" => "Dados inválidos."]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id = ?");
    $stmt->execute([$foto_perfil, $usuario_id]);

    echo json_encode(["sucesso" => true, "foto_perfil" => $foto_perfil]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao atualizar foto: " . $e->getMessage()]);
}