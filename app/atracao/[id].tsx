import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import FavoriteButton from '@/src/components/FavoriteButton';
import InfoBlock from '@/src/components/InfoBlock';
import { getAtracaoById } from '@/src/database/database';
import { COLORS } from '@/src/theme/colors';

export default function AtracaoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const atracao = getAtracaoById(id);

  if (!atracao) {
    return (
      <View style={styles.vazio}>
        <Text>Atração não encontrada.</Text>
      </View>
    );
  }

  const { endereco } = atracao;
  const enderecoCompleto =
    `${endereco.rua}, ${endereco.numero}\n` +
    `${endereco.bairro}\n` +
    `${endereco.cidade} – ${endereco.estado}`;

  return (
    <>
      <Stack.Screen options={{ title: 'Atração' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        <Image source={atracao.imagem} style={styles.imagem} />

        <View style={styles.corpo}>
          <View style={styles.linhaTopo}>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>{atracao.categoria}</Text>
            </View>
            <FavoriteButton atracaoId={atracao.id} size={28} />
          </View>

          <Text style={styles.nome}>{atracao.nome}</Text>

          <InfoBlock icon="location-outline" titulo="Endereço" texto={enderecoCompleto} />
          <InfoBlock icon="time-outline" titulo="Horário de funcionamento" texto={atracao.horarios} />
          <InfoBlock icon="book-outline" titulo="História e importância" texto={atracao.historia} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia },
  conteudo: { paddingBottom: 40 },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagem: { width: '100%', height: 240 },
  corpo: { padding: 20 },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#E8F4FB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeTexto: { color: COLORS.azulMarinho, fontWeight: '700', fontSize: 12 },
  nome: { fontSize: 24, fontWeight: '800', color: COLORS.texto, marginVertical: 12 },
});