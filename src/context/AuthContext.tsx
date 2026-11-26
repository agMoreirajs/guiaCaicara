import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import {
  listarFavoritos,
  adicionarFavorito,
  removerFavorito,
  atualizarFotoPerfil,
} from '../services/api';

export type Usuario = {
  id: number;
  nome: string;
  usuario: string;
  foto_perfil: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  favoritos: string[];
  entrar: (dados: Usuario) => Promise<void>;
  sair: () => void;
  alternarFavorito: (atracaoId: string) => Promise<void>;
  isFavorito: (atracaoId: string) => boolean;
  mudarFoto: (novaFoto: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const router = useRouter();

  const entrar = async (dados: Usuario) => {
    setUsuario(dados);
    const favs = await listarFavoritos(dados.id);
    setFavoritos(favs);
  };

const sair = () => {
  setUsuario(null);
  setFavoritos([]);
  router.replace('/login');
};

  const isFavorito = (atracaoId: string) => favoritos.includes(atracaoId);

  const alternarFavorito = async (atracaoId: string) => {
    if (!usuario) return;
    if (isFavorito(atracaoId)) {
      setFavoritos((prev) => prev.filter((id) => id !== atracaoId));
      await removerFavorito(usuario.id, atracaoId);
    } else {
      setFavoritos((prev) => [...prev, atracaoId]);
      await adicionarFavorito(usuario.id, atracaoId);
    }
  };

  const mudarFoto = async (novaFoto: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, foto_perfil: novaFoto });
    await atualizarFotoPerfil(usuario.id, novaFoto);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, favoritos, entrar, sair, alternarFavorito, isFavorito, mudarFoto }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);