import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import AttractionCard from '@/src/components/AttractionCard';
import { getCidadeById } from '@/src/database/database';
import { COLORS } from '@/src/theme/colors';

export default function CidadeDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cidade = getCidadeById(id);

  if (!cidade) {
    return (
      <View style={styles.vazio}>
        <Text>Cidade não encontrada.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: cidade.nome }} />
      <FlatList
        style={styles.container}
        data={cidade.atracoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conteudo}
        ListHeaderComponent={
          <ImageBackground source={cidade.imagem} style={styles.hero}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitulo}>{cidade.nome}</Text>
              <Text style={styles.heroSlogan}>{cidade.slogan}</Text>
            </View>
          </ImageBackground>
        }
        renderItem={({ item }) => (
          <AttractionCard
            attraction={{ ...item, cidadeId: cidade.id, cidadeNome: cidade.nome }}
            onPress={() => router.push(`/atracao/${item.id}`)}
          />
        )}
        ListFooterComponent={<Text style={styles.rodape}>Principais pontos turísticos</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia },
  conteudo: { paddingBottom: 30 },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 220, justifyContent: 'flex-end', marginBottom: 16 },
  heroOverlay: { backgroundColor: 'rgba(11, 79, 124, 0.5)', padding: 20 },
  heroTitulo: { fontSize: 30, fontWeight: '800', color: COLORS.branco },
  heroSlogan: { fontSize: 15, color: '#EAF6FF', marginTop: 2 },
  rodape: { textAlign: 'center', color: COLORS.textoSuave, fontSize: 12, marginTop: 4, marginBottom: 10 },
});