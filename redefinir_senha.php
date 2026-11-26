<?php
require_once "conexao.php";
date_default_timezone_set("America/Sao_Paulo");

$dados = json_decode(file_get_contents("php://input"), true);
if (!is_array($dados)) {
    $dados = [];
}

$email = trim($dados["email"] ?? "");
$codigo = trim($dados["codigo"] ?? "");
$novaSenha = (string)($dados["nova_senha"] ?? "");

if ($email === "" || $codigo === "" || trim($novaSenha) === "") {
    http_response_code(400);
    echo json_encode(["erro" => "Preencha o e-mail, o código e a nova senha."]);
    exit;
}

if (strlen($novaSenha) < 6) {
    http_response_code(400);
    echo json_encode(["erro" => "A nova senha deve ter pelo menos 6 caracteres."]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "SELECT id, usuario_id, expira_em, usado
         FROM recuperacao_senha
         WHERE LOWER(email) = LOWER(:email)
           AND codigo = :codigo
         ORDER BY id DESC
         LIMIT 1"
    );
    $stmt->execute([
        ":email" => $email,
        ":codigo" => $codigo,
    ]);
    $registro = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$registro) {
        http_response_code(400);
        echo json_encode(["erro" => "Código inválido."]);
        exit;
    }

    if ((int)$registro["usado"] === 1) {
        http_response_code(400);
        echo json_encode(["erro" => "Este código já foi utilizado. Solicite um novo."]);
        exit;
    }

    if (strtotime($registro["expira_em"]) < time()) {
        http_response_code(400);
        echo json_encode(["erro" => "Este código expirou. Solicite um novo."]);
        exit;
    }

    $pdo->beginTransaction();

    $hashSenha = password_hash($novaSenha, PASSWORD_DEFAULT);
    $updUser = $pdo->prepare("UPDATE usuarios SET senha = :senha WHERE id = :id");
    $updUser->execute([
        ":senha" => $hashSenha,
        ":id" => $registro["usuario_id"],
    ]);

    $updCod = $pdo->prepare("UPDATE recuperacao_senha SET usado = 1 WHERE id = :id");
    $updCod->execute([":id" => $registro["id"]]);

    $pdo->commit();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Senha redefinida com sucesso! Agora faça login."
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao redefinir senha: " . $e->getMessage()]);
}