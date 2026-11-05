import { Image, StyleSheet, Text, View } from 'react-native';
import { LOGO } from '@/src/assets';
import { COLORS } from '@/src/theme/colors';

type Props = { title: string; subtitle?: string };

export default function AppHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      <View style={styles.textos}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  logo: { width: 48, height: 48, marginRight: 12 },
  textos: { flex: 1 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.azulMarinho },
  subtitle: { fontSize: 13, color: COLORS.azulClaro, fontWeight: '600', letterSpacing: 1 },
});