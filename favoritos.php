<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dados = json_decode(file_get_contents("php://input"), true) ?? [];
    $usuarioId = (int)($dados["usuario_id"] ?? 0);
    $atracaoId = trim((string)($dados["atracao_id"] ?? ""));
    $acao = trim((string)($dados["acao"] ?? "toggle"));

    if ($usuarioId <= 0 || $atracaoId === "") {
        http_response_code(400);
        echo json_encode(["erro" => "Dados de favorito inválidos."]);
        exit;
    }

    try {
        if ($acao === "remover") {
            $stmt = $pdo->prepare("DELETE FROM favoritos WHERE usuario_id = :usuario_id AND atracao_id = :atracao_id");
            $stmt->execute([":usuario_id" => $usuarioId, ":atracao_id" => $atracaoId]);
            echo json_encode(["sucesso" => true, "favoritado" => false]);
            exit;
        }

        if ($acao === "adicionar") {
            $stmt = $pdo->prepare("INSERT IGNORE INTO favoritos (usuario_id, atracao_id) VALUES (:usuario_id, :atracao_id)");
            $stmt->execute([":usuario_id" => $usuarioId, ":atracao_id" => $atracaoId]);
            echo json_encode(["sucesso" => true, "favoritado" => true]);
            exit;
        }

        $check = $pdo->prepare("SELECT id FROM favoritos WHERE usuario_id = :usuario_id AND atracao_id = :atracao_id");
        $check->execute([":usuario_id" => $usuarioId, ":atracao_id" => $atracaoId]);

        if ($check->fetch()) {
            $del = $pdo->prepare("DELETE FROM favoritos WHERE usuario_id = :usuario_id AND atracao_id = :atracao_id");
            $del->execute([":usuario_id" => $usuarioId, ":atracao_id" => $atracaoId]);
            echo json_encode(["sucesso" => true, "favoritado" => false]);
        } else {
            $ins = $pdo->prepare("INSERT INTO favoritos (usuario_id, atracao_id) VALUES (:usuario_id, :atracao_id)");
            $ins->execute([":usuario_id" => $usuarioId, ":atracao_id" => $atracaoId]);
            echo json_encode(["sucesso" => true, "favoritado" => true]);
        }
        exit;
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao salvar favorito: " . $e->getMessage()]);
        exit;
    }
}

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