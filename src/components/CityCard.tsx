import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Cidade } from '@/src/types';
import { COLORS } from '@/src/theme/colors';

type Props = { cidade: Cidade; onPress: () => void };

export default function CityCard({ cidade, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <ImageBackground source={cidade.imagem} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay}>
          <Text style={styles.nome}>{cidade.nome}</Text>
          <Text style={styles.slogan}>{cidade.slogan}</Text>
          <Text style={styles.total}>{cidade.atracoes.length} pontos turísticos</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    backgroundColor: COLORS.branco,
  },
  image: { height: 180, justifyContent: 'flex-end' },
  imageRadius: { borderRadius: 18 },
  overlay: {
    backgroundColor: 'rgba(11, 79, 124, 0.45)',
    padding: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  nome: { fontSize: 26, fontWeight: '800', color: COLORS.branco },
  slogan: { fontSize: 14, color: '#EAF6FF', marginTop: 2 },
  total: { fontSize: 12, color: COLORS.amarelo, marginTop: 6, fontWeight: '700' },
});