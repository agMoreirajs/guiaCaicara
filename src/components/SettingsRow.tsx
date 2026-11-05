import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
  danger?: boolean;
};

export default function SettingsRow({ icon, label, onPress, right, danger = false }: Props) {
  const cor = danger ? COLORS.vermelho : COLORS.azulMarinho;
  const estiloPerigo: ViewStyle | undefined = danger
    ? { borderColor: '#F9D3D4', backgroundColor: '#FFF5F5' }
    : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.linha, estiloPerigo, pressed && onPress && { opacity: 0.8 }]}
    >
      <View style={[styles.icone, { backgroundColor: danger ? '#FDECEC' : '#E8F4FB' }]}>
        <Ionicons name={icon} size={18} color={cor} />
      </View>
      <Text style={[styles.label, danger && { color: COLORS.vermelho }]}>{label}</Text>
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={COLORS.textoSuave} /> : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.branco,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borda,
  },
  icone: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.texto },
});