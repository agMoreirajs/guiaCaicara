import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  texto: string;
  onPress?: () => void;
};

export default function InfoBlock({ icon, titulo, texto, onPress }: Props) {
  return (
    <View style={styles.bloco}>
      <View style={styles.cabecalho}>
        <View style={styles.iconeWrapper}>
          <Ionicons name={icon} size={18} color={COLORS.azulMarinho} />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>

      <Text style={styles.texto}>{texto}</Text>

      {onPress ? (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.botaoMapa, pressed && styles.botaoPressionado]}
          accessibilityRole="button"
          accessibilityLabel="Ver no mapa"
        >
          <Ionicons name="map-outline" size={18} color={COLORS.branco} />
          <Text style={styles.botaoTexto}>Ver no mapa</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.branco} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: {
    backgroundColor: COLORS.branco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borda,
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  iconeWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F4FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titulo: { flex: 1, fontSize: 14, fontWeight: '700', color: COLORS.azulMarinho },
  texto: { fontSize: 15, color: COLORS.texto, lineHeight: 22, paddingLeft: 42 },
  botaoMapa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    marginLeft: 42,
    backgroundColor: COLORS.azulMarinho,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  botaoPressionado: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  botaoTexto: { flex: 1, color: COLORS.branco, fontSize: 15, fontWeight: '700' },
});