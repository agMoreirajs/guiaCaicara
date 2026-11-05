import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = '@roteiro_caicara:favoritos';

type FavoritesContextValue = {
  favoritos: string[];
  isFavorito: (id: string) => boolean;
  toggleFavorito: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((valor) => {
        if (valor) setFavoritos(JSON.parse(valor) as string[]);
      })
      .catch(() => {})
      .finally(() => setCarregado(true));
  }, []);

  useEffect(() => {
    if (!carregado) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos)).catch(() => {});
  }, [favoritos, carregado]);

  const isFavorito = useCallback((id: string) => favoritos.includes(id), [favoritos]);

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    );
  }, []);

  const value = useMemo(
    () => ({ favoritos, isFavorito, toggleFavorito }),
    [favoritos, isFavorito, toggleFavorito]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  return context;
}