<?php
require_once "conexao.php";

$dados       = json_decode(file_get_contents("php://input"), true);
$usuario_id  = $dados['usuario_id'] ?? 0;
$foto_perfil = trim($dados['foto_perfil'] ?? '');

if (!$usuario_id || $foto_perfil === '') {
    http_response_code(400);
    echo json_encode(["erro" => "Dados inválidos."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id = ?");
$stmt->execute([$foto_perfil, $usuario_id]);

echo json_encode(["sucesso" => true, "foto_perfil" => $foto_perfil]);