import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/src/context/FavoritesContext';
import { COLORS } from '@/src/theme/colors';

type Props = { atracaoId: string; size?: number };

export default function FavoriteButton({ atracaoId, size = 22 }: Props) {
  const { isFavorito, toggleFavorito } = useFavorites();
  const ativo = isFavorito(atracaoId);

  return (
    <Pressable
      onPress={() => toggleFavorito(atracaoId)}
      hitSlop={12}
      style={({ pressed }) => [styles.botao, pressed && { transform: [{ scale: 0.9 }] }]}
      accessibilityRole="button"
      accessibilityLabel={ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Ionicons
        name={ativo ? 'heart' : 'heart-outline'}
        size={size}
        color={ativo ? COLORS.vermelho : COLORS.textoSuave}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: { padding: 4 },
});