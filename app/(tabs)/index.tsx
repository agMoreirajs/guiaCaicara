import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '@/src/components/AppHeader';
import SearchBar from '@/src/components/SearchBar';
import CityCard from '@/src/components/CityCard';
import AttractionCard from '@/src/components/AttractionCard';
import EmptyState from '@/src/components/EmptyState';
import { COLORS } from '@/src/theme/colors';
import { buscarAtracoes, buscarCidades } from '@/src/database/database';

export default function ExploraScreen() {
  const [busca, setBusca] = useState('');
  const temBusca = busca.trim().length > 0;

  const cidadesFiltradas = useMemo(() => buscarCidades(busca), [busca]);
  const atracoesEncontradas = useMemo(() => buscarAtracoes(busca), [busca]);

  const nenhumResultado = cidadesFiltradas.length === 0 && atracoesEncontradas.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={cidadesFiltradas}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.conteudo}
        renderItem={({ item }) => (
          <CityCard cidade={item} onPress={() => router.push(`/cidade/${item.id}`)} />
        )}
        ListHeaderComponent={
          <>
            <AppHeader title="Roteiro Caiçara" subtitle="BAIXADA SANTISTA" />
            <SearchBar value={busca} onChangeText={setBusca} />
            {!temBusca && <Text style={styles.secao}>Os 9 municípios</Text>}
          </>
        }
        ListFooterComponent={
          temBusca && atracoesEncontradas.length > 0 ? (
            <>
              <Text style={styles.secao}>Pontos turísticos</Text>
              {atracoesEncontradas.map((atracao) => (
                <AttractionCard
                  key={atracao.id}
                  attraction={atracao}
                  showCidade
                  onPress={() => router.push(`/atracao/${atracao.id}`)}
                />
              ))}
            </>
          ) : null
        }
        ListEmptyComponent={
          nenhumResultado ? (
            <EmptyState icon="map-outline" texto={`Nenhum resultado para "${busca}".`} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia },
  conteudo: { paddingBottom: 30 },
  secao: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.texto,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
});