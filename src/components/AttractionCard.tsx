import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FavoriteButton from './FavoriteButton';
import type { AtracaoComCidade } from '@/src/types';
import { COLORS } from '@/src/theme/colors';

type Props = {
  attraction: AtracaoComCidade;
  onPress: () => void;
  showCidade?: boolean;
};

export default function AttractionCard({ attraction, onPress, showCidade = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}
    >
      <Image source={attraction.imagem} style={styles.imagem} />

      <View style={styles.info}>
        <View style={styles.topo}>
          <Text style={styles.categoria} numberOfLines={1}>
            {attraction.categoria}
          </Text>
          <FavoriteButton atracaoId={attraction.id} size={22} />
        </View>

        <Text style={styles.nome} numberOfLines={2}>
          {attraction.nome}
        </Text>

        {showCidade ? (
          <View style={styles.linhaCidade}>
            <Ionicons name="location-outline" size={14} color={COLORS.azulClaro} />
            <Text style={styles.cidade}>{attraction.cidadeNome}</Text>
          </View>
        ) : null}

        <Text style={styles.verMais}>Ver detalhes →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.branco,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borda,
  },
  imagem: { width: 110, height: 120 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoria: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.azulClaro,
    textTransform: 'uppercase',
    flex: 1,
    marginRight: 6,
  },
  nome: { fontSize: 15, fontWeight: '700', color: COLORS.texto, marginTop: 4 },
  linhaCidade: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cidade: { fontSize: 12, color: COLORS.textoSuave },
  verMais: { fontSize: 13, color: COLORS.azulMarinho, fontWeight: '600', marginTop: 6 },
});