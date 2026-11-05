import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

export default function PrimaryButton({ title, onPress, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
    >
      <Text style={styles.texto}>{title}</Text>
      {icon ? <Ionicons name={icon} size={20} color={COLORS.amarelo} style={styles.icone} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.azulMarinho,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 5,
    shadowColor: COLORS.azulMarinho,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  pressionado: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  texto: { color: COLORS.branco, fontSize: 17, fontWeight: '700' },
  icone: { marginLeft: 10 },
});