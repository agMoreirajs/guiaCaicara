import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  texto: string;
};

export default function InfoBlock({ icon, titulo, texto }: Props) {
  return (
    <View style={styles.bloco}>
      <View style={styles.cabecalho}>
        <View style={styles.iconeWrapper}>
          <Ionicons name={icon} size={18} color={COLORS.azulMarinho} />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <Text style={styles.texto}>{texto}</Text>
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
  titulo: { fontSize: 14, fontWeight: '700', color: COLORS.azulMarinho },
  texto: { fontSize: 15, color: COLORS.texto, lineHeight: 22, paddingLeft: 42 },
});