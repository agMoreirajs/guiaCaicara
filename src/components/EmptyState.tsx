import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  texto: string;
};

export default function EmptyState({ icon = 'search-outline', texto }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={56} color={COLORS.borda} />
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 40 },
  texto: { marginTop: 12, textAlign: 'center', color: COLORS.textoSuave, fontSize: 15, lineHeight: 22 },
});