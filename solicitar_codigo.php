<?php
require_once "conexao.php";
date_default_timezone_set("America/Sao_Paulo");

$baseSrc = __DIR__ . "/PHPMailer/src";
require_once $baseSrc . "/Exception.php";
require_once $baseSrc . "/PHPMailer.php";
require_once $baseSrc . "/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dados = json_decode(file_get_contents("php://input"), true);
if (!is_array($dados)) {
    $dados = [];
}

$email = trim($dados["email"] ?? "");
if ($email === "") {
    http_response_code(400);
    echo json_encode(["erro" => "Informe o seu e-mail."]);
    exit;
}

try {
    $stmtUser = $pdo->prepare("SELECT id, nome, email FROM usuarios WHERE LOWER(email) = LOWER(:email) LIMIT 1");
    $stmtUser->execute([":email" => $email]);
    $usuario = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        http_response_code(404);
        echo json_encode(["erro" => "E-mail não encontrado."]);
        exit;
    }

    $codigo = str_pad((string)random_int(0, 999999), 6, "0", STR_PAD_LEFT);
    $expiraEm = date("Y-m-d H:i:s", strtotime("+15 minutes"));

    $ins = $pdo->prepare(
        "INSERT INTO recuperacao_senha (usuario_id, email, codigo, expira_em, usado)
         VALUES (:usuario_id, :email, :codigo, :expira_em, 0)"
    );
    $ins->execute([
        ":usuario_id" => $usuario["id"],
        ":email" => $usuario["email"],
        ":codigo" => $codigo,
        ":expira_em" => $expiraEm,
    ]);

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "agathamoreira365@gmail.com";
    $mail->Password = "fmztlmteqxxygmfc";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom("agathamoreira365@gmail.com", "Roteiro Caiçara");
    $mail->addAddress($usuario["email"], $usuario["nome"] ?? "");

    $mail->isHTML(true);
    $mail->Subject = "Seu código de recuperação de senha - Roteiro Caiçara";
    $mail->Body = '
      <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 480px; margin: 0 auto; padding: 20px;">
        <p style="font-size: 16px; margin-bottom: 16px;">Olá,</p>
        <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">
          Insira este código na tela de recuperação para definir uma nova senha na sua conta:
        </p>
        <div style="font-size: 32px; font-weight: 700; letter-spacing: 4px; color: #111827; margin: 20px 0;">
          ' . htmlspecialchars($codigo, ENT_QUOTES, "UTF-8") . '
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #374151; margin-bottom: 14px;">
          Esse código é válido por 15 minutos e só pode ser usado uma vez.
        </p>
        <p style="font-size: 14px; line-height: 1.5; color: #374151; margin-bottom: 20px;">
          Se você não solicitou a recuperação de senha, ignore este e-mail.
        </p>
        <p style="font-size: 15px; line-height: 1.5; margin: 0;">
          Até logo,<br>
          <strong>Roteiro Caiçara</strong>
        </p>
      </div>
    ';
    $mail->AltBody = "Olá,\n\nInsira este código para redefinir sua senha: {$codigo}\n\nEsse código é válido por 15 minutos e só pode ser usado uma vez.\nSe você não solicitou isso, ignore este e-mail.\n\nAté logo,\nRoteiro Caiçara";

    $mail->send();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Enviamos um código de 6 dígitos para o seu e-mail."
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao enviar e-mail de recuperação: " . $e->getMessage()]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro no servidor: " . $e->getMessage()]);
}