const API_BASE_URL = 'http://10.0.2.2/api-roteiro';

export interface DadosUsuario {
  id: number;
  nome: string;
  usuario: string;
  email?: string;
  foto_perfil?: string;
}

async function lerRespostaJson(resposta: Response) {
  const texto = await resposta.text();
  try {
    return JSON.parse(texto);
  } catch {
    throw new Error(
      texto.trim().startsWith('<')
        ? 'O servidor retornou HTML em vez de JSON. Verifique o PHP/XAMPP.'
        : 'Resposta inválida do servidor.'
    );
  }
}

export async function fazerLogin(usuario: string, senha: string): Promise<DadosUsuario> {
  const resposta = await fetch(`${API_BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });

  const dados = await lerRespostaJson(resposta);

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível fazer login.');
  }

  const usuarioRetornado = dados?.usuario ?? dados;
  const idConvertido = Number(usuarioRetornado?.id);

  if (!idConvertido || Number.isNaN(idConvertido)) {
    throw new Error('O login não retornou um ID de usuário válido.');
  }

  return {
    ...usuarioRetornado,
    id: idConvertido,
  };
}

export async function cadastrarUsuario(
  nome: string,
  usuario: string,
  email: string,
  senha: string
): Promise<DadosUsuario> {
  const resposta = await fetch(`${API_BASE_URL}/cadastro.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, usuario, email, senha }),
  });

  const dados = await lerRespostaJson(resposta);

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível cadastrar.');
  }

  return dados;
}

export async function listarFavoritos(usuarioId: number): Promise<string[]> {
  const resposta = await fetch(`${API_BASE_URL}/favoritos.php?usuario_id=${usuarioId}`);
  const dados = await lerRespostaJson(resposta);

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível carregar os favoritos.');
  }

  return Array.isArray(dados)
    ? dados.map(String)
    : Array.isArray(dados?.favoritos)
      ? dados.favoritos.map(String)
      : [];
}

export async function alternarFavorito(
  usuarioId: number,
  atracaoId: string
): Promise<{ sucesso: boolean; favoritado: boolean }> {
  const resposta = await fetch(`${API_BASE_URL}/favoritos.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id: usuarioId,
      atracao_id: atracaoId,
      acao: 'toggle',
    }),
  });

  const dados = await lerRespostaJson(resposta);

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível atualizar o favorito.');
  }

  return dados;
}

export async function adicionarFavorito(usuarioId: number, atracaoId: string): Promise<void> {
  const resposta = await fetch(`${API_BASE_URL}/favoritos.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id: usuarioId,
      atracao_id: atracaoId,
      acao: 'adicionar',
    }),
  });

  const dados = await lerRespostaJson(resposta);
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível adicionar favorito.');
  }
}

export async function removerFavorito(usuarioId: number, atracaoId: string): Promise<void> {
  const resposta = await fetch(`${API_BASE_URL}/favoritos.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id: usuarioId,
      atracao_id: atracaoId,
      acao: 'remover',
    }),
  });

  const dados = await lerRespostaJson(resposta);
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível remover favorito.');
  }
}

export async function atualizarFotoPerfil(usuarioId: number, fotoPerfil: string): Promise<void> {
  const resposta = await fetch(`${API_BASE_URL}/atualizar_foto.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id: usuarioId, foto_perfil: fotoPerfil }),
  });

  const dados = await lerRespostaJson(resposta);
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível atualizar a foto de perfil.');
  }
}