import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '@/src/components/AppHeader';
import AttractionCard from '@/src/components/AttractionCard';
import EmptyState from '@/src/components/EmptyState';
import { useFavorites } from '@/src/context/FavoritesContext';
import { getAtracaoById } from '@/src/database/database';
import { COLORS } from '@/src/theme/colors';

export default function FavoritosScreen() {
  const { favoritos } = useFavorites();

  const lista = useMemo(
    () => favoritos.map((id) => getAtracaoById(id)).filter((a) => a !== undefined),
    [favoritos]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Meus Favoritos"
        subtitle={`${lista.length} ${lista.length === 1 ? 'local salvo' : 'locais salvos'}`}
      />
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conteudo}
        renderItem={({ item }) => (
          <AttractionCard
            attraction={item}
            showCidade
            onPress={() => router.push(`/atracao/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            texto="Você ainda não salvou nenhum local. Toque no coração nas atrações para guardá-las aqui."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia },
  conteudo: { paddingTop: 10, paddingBottom: 30, flexGrow: 1 },
});