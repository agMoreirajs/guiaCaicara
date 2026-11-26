<?php
require_once "conexao.php";

$dados   = json_decode(file_get_contents("php://input"), true);
$usuario = trim($dados['usuario'] ?? '');
$senha   = $dados['senha'] ?? '';

$stmt = $pdo->prepare("SELECT id, nome, usuario, foto_perfil, senha FROM usuarios WHERE usuario = ?");
$stmt->execute([$usuario]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($senha, $user['senha'])) {
    unset($user['senha']);
    echo json_encode(["sucesso" => true, "usuario" => $user]);
} else {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário ou senha inválidos."]);
}