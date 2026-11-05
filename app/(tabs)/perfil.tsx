import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SettingsRow from '@/src/components/SettingsRow';
import { useFavorites } from '@/src/context/FavoritesContext';
import { cidades } from '@/src/database/database';
import { AVATAR } from '@/src/assets';
import { COLORS } from '@/src/theme/colors';

export default function PerfilScreen() {
  const { favoritos } = useFavorites();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const confirmarSaida = () => {
    Alert.alert('Sair do aplicativo', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => router.replace('/') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Image source={AVATAR} style={styles.avatar} />
          <Text style={styles.nome}>Viajante Caiçara</Text>
          <Text style={styles.subtitulo}>Explorador da Baixada Santista</Text>

          <View style={styles.estatisticas}>
            <Estatistica valor={favoritos.length} rotulo="Salvos" />
            <View style={styles.divisor} />
            <Estatistica valor={cidades.length} rotulo="Cidades" />
          </View>
        </View>

        <Secao titulo="Minha conta">
          <SettingsRow
            icon="bookmark-outline"
            label="Locais salvos (favoritos)"
            onPress={() => router.push('/favoritos')}
          />
          <SettingsRow
            icon="settings-outline"
            label="Configurações da conta"
            onPress={() => Alert.alert('Configurações', 'Em breve: edição de nome, foto e preferências.')}
          />
          <SettingsRow
            icon="notifications-outline"
            label="Notificações"
            right={
              <Switch
                value={notificacoesAtivas}
                onValueChange={setNotificacoesAtivas}
                trackColor={{ true: COLORS.azulClaro, false: COLORS.borda }}
                thumbColor={COLORS.branco}
              />
            }
          />
        </Secao>

        <Secao titulo="Suporte">
          <SettingsRow
            icon="help-circle-outline"
            label="Guia de ajuda & FAQ"
            onPress={() =>
              Alert.alert(
                'Ajuda',
                'Use a busca na tela Explora para encontrar cidades e atrações. Toque no coração para salvar favoritos.'
              )
            }
          />
        </Secao>

        <Secao titulo="Conta">
          <SettingsRow icon="log-out-outline" label="Sair do aplicativo" danger onPress={confirmarSaida} />
        </Secao>
      </ScrollView>
    </SafeAreaView>
  );
}

function Estatistica({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <View style={styles.estatistica}>
      <Text style={styles.estatisticaValor}>{valor}</Text>
      <Text style={styles.estatisticaRotulo}>{rotulo}</Text>
    </View>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.secaoTitulo}>{titulo.toUpperCase()}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.areia },
  conteudo: { paddingBottom: 40 },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.azulMarinho,
    paddingVertical: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: COLORS.amarelo },
  nome: { marginTop: 12, fontSize: 20, fontWeight: '800', color: COLORS.branco },
  subtitulo: { fontSize: 13, color: '#BFE3F7', marginTop: 2 },
  estatisticas: {
    flexDirection: 'row',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '85%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  estatistica: { alignItems: 'center', flex: 1 },
  estatisticaValor: { fontSize: 20, fontWeight: '800', color: COLORS.amarelo },
  estatisticaRotulo: { fontSize: 12, color: COLORS.branco, marginTop: 2 },
  divisor: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
  secao: { paddingHorizontal: 20, marginBottom: 8 },
  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textoSuave,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
});