import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import PrimaryButton from '../src/components/PrimaryButton';
import { LOGO } from '@/src/assets';
import { COLORS } from '@/src/theme/colors';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centro}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.titulo}>ROTEIRO CAIÇARA</Text>
        <Text style={styles.subtitulo}>BAIXADA SANTISTA</Text>
        <Text style={styles.descricao}>
          Explore as praias, histórias e os 9 municípios do litoral paulista.
        </Text>
      </View>

      <View style={styles.rodape}>
        <PrimaryButton
          title="Venha se aventurar!"
          icon="compass-outline"
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia, paddingHorizontal: 24 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 240, height: 240 },
  titulo: { marginTop: 24, fontSize: 26, fontWeight: '800', color: COLORS.texto, letterSpacing: 0.5 },
  subtitulo: { fontSize: 20, fontWeight: '800', color: COLORS.azulClaro, marginTop: 4, letterSpacing: 2 },
  descricao: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.textoSuave,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  rodape: { paddingBottom: 40 },
});