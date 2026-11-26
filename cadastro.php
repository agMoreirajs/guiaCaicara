<?php
require_once "conexao.php";

$dados = json_decode(file_get_contents("php://input"), true);
if (!is_array($dados)) {
    $dados = [];
}

$nome = trim($dados["nome"] ?? "");
$usuario = trim($dados["usuario"] ?? "");
$email = trim($dados["email"] ?? "");
$senha = $dados["senha"] ?? "";

if ($nome === "" || $usuario === "" || $email === "" || $senha === "") {
    http_response_code(400);
    echo json_encode(["erro" => "Preencha todos os campos."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["erro" => "Informe um e-mail válido."]);
    exit;
}

$stmtCheck = $pdo->prepare("SELECT id FROM usuarios WHERE usuario = :usuario OR LOWER(email) = LOWER(:email)");
$stmtCheck->execute([
    ":usuario" => $usuario,
    ":email" => $email
]);

if ($stmtCheck->fetch()) {
    http_response_code(409);
    echo json_encode(["erro" => "Usuário ou e-mail já cadastrado."]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
$fotoPadrao = "avatar1";

$stmt = $pdo->prepare(
    "INSERT INTO usuarios (nome, usuario, email, senha, foto_perfil) VALUES (:nome, :usuario, :email, :senha, :foto_perfil)"
);

$ok = $stmt->execute([
    ":nome" => $nome,
    ":usuario" => $usuario,
    ":email" => $email,
    ":senha" => $senhaHash,
    ":foto_perfil" => $fotoPadrao
]);

if ($ok) {
    http_response_code(201);
    echo json_encode([
        "id" => (int)$pdo->lastInsertId(),
        "nome" => $nome,
        "usuario" => $usuario,
        "email" => $email,
        "foto_perfil" => $fotoPadrao
    ]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao cadastrar usuário."]);
}