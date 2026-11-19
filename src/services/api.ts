const BASE_URL = 'http://10.59.47.30/api-roteiro';

export async function cadastrarUsuario(nome: string, usuario: string, senha: string) {
  const res = await fetch(`${BASE_URL}/cadastro.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, usuario, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || 'Erro ao cadastrar');
  return data;
}

export async function fazerLogin(usuario: string, senha: string) {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || 'Erro ao entrar');
  return data.usuario;
}

export async function listarFavoritos(usuarioId: number): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/favoritos.php?usuario_id=${usuarioId}`);
  const data = await res.json();
  return data.favoritos ?? [];
}

export async function adicionarFavorito(usuarioId: number, atracaoId: string) {
  const res = await fetch(`${BASE_URL}/favoritos.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id: usuarioId, atracao_id: atracaoId }),
  });
  return res.json();
}

export async function removerFavorito(usuarioId: number, atracaoId: string) {
  const res = await fetch(`${BASE_URL}/favoritos.php`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id: usuarioId, atracao_id: atracaoId }),
  });
  return res.json();
}

export async function atualizarFotoPerfil(usuarioId: number, fotoPerfil: string) {
  const res = await fetch(`${BASE_URL}/atualizar_foto.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id: usuarioId, foto_perfil: fotoPerfil }),
  });
  return res.json();
}