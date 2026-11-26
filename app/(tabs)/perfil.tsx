import { useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SettingsRow from '@/src/components/SettingsRow';
import { useAuth } from '@/src/context/AuthContext';
import { cidades } from '@/src/database/database';
import { COLORS } from '@/src/theme/colors';
import {
  AVATAR,
  AVATAR_F1,
  AVATAR_F2,
  AVATAR_F3,
  AVATAR_F4,
  AVATAR_F5,
  AVATAR_M1,
  AVATAR_M2,
  AVATAR_M3,
  AVATAR_M4,
  AVATAR_M5,
} from '@/src/assets';

const AVATARES_PERFIL: Record<string, ImageSourcePropType> = {
  avatar1: AVATAR,
  avatarF1: AVATAR_F1,
  avatarF2: AVATAR_F2,
  avatarF3: AVATAR_F3,
  avatarF4: AVATAR_F4,
  avatarF5: AVATAR_F5,
  avatarM1: AVATAR_M1,
  avatarM2: AVATAR_M2,
  avatarM3: AVATAR_M3,
  avatarM4: AVATAR_M4,
  avatarM5: AVATAR_M5,
};

export default function PerfilScreen() {
  const { usuario, favoritos, mudarFoto, sair } = useAuth();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [modalAvatarVisivel, setModalAvatarVisivel] = useState(false);

  const chaveAvatarAtual = usuario?.foto_perfil || 'avatar1';
  const imagemAvatarAtual = AVATARES_PERFIL[chaveAvatarAtual] ?? AVATAR;

  const selecionarAvatar = async (chave: string) => {
    try {
      await mudarFoto(chave);
      setModalAvatarVisivel(false);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a foto de perfil.');
    }
  };

  const confirmarSaida = () => {
    Alert.alert('Sair do aplicativo', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => sair() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Pressable onPress={() => setModalAvatarVisivel(true)} style={styles.avatarWrapper}>
            <Image source={imagemAvatarAtual} style={styles.avatar} />
            <View style={styles.badgeEditar}>
              <Ionicons name="camera" size={16} color={COLORS.azulMarinho} />
            </View>
          </Pressable>

          <Text style={styles.nome}>{usuario?.nome || 'Viajante Caiçara'}</Text>
          <Text style={styles.subtitulo}>
            {usuario?.usuario ? `@${usuario.usuario}` : 'Explorador da Baixada Santista'}
          </Text>

          <View style={styles.estatisticas}>
            <Estatistica valor={favoritos.length} rotulo="Salvos" />
            <View style={styles.divisor} />
            <Estatistica valor={cidades.length} rotulo="Cidades" />
          </View>
        </View>

        <Secao titulo="Minha conta">
          <SettingsRow
            icon="person-circle-outline"
            label="Alterar foto de perfil"
            onPress={() => setModalAvatarVisivel(true)}
          />
          <SettingsRow
            icon="bookmark-outline"
            label="Locais salvos (favoritos)"
            onPress={() => router.push('/favoritos')}
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
                'Use a busca na tela Explora para encontrar cidades e atrações. Toque no coração para salvar favoritos na sua conta.'
              )
            }
          />
        </Secao>


        <Secao titulo="Conta">


          <SettingsRow
            icon="log-out-outline"
            label="Sair do aplicativo"
            danger
            onPress={sair}
          />

        </Secao>


      </ScrollView>

      <Modal
        visible={modalAvatarVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalAvatarVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Escolha sua foto de perfil</Text>
            <Text style={styles.modalSubtitulo}>Toque em um avatar para salvar na sua conta</Text>

            <View style={styles.gradeAvatares}>
              {Object.entries(AVATARES_PERFIL).map(([chave, imagem]) => {
                const selecionado = chaveAvatarAtual === chave;
                return (
                  <TouchableOpacity
                    key={chave}
                    onPress={() => selecionarAvatar(chave)}
                    style={[styles.opcaoAvatar, selecionado && styles.opcaoAvatarSelecionada]}
                  >
                    <Image source={imagem} style={styles.avatarMini} />
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => setModalAvatarVisivel(false)}
              style={styles.botaoFechar}
            >
              <Text style={styles.botaoFecharTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.areia,
  },
  conteudo: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.azulMarinho,
    paddingVertical: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: COLORS.amarelo,
  },
  badgeEditar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.amarelo,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.azulMarinho,
  },
  nome: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.branco,
  },
  subtitulo: {
    fontSize: 13,
    color: '#BFE3F7',
    marginTop: 2,
  },
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
  estatistica: {
    alignItems: 'center',
    flex: 1,
  },
  estatisticaValor: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.amarelo,
  },
  estatisticaRotulo: {
    fontSize: 12,
    color: COLORS.branco,
    marginTop: 2,
  },
  divisor: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  secao: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textoSuave,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.branco,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.azulMarinho,
  },
  modalSubtitulo: {
    fontSize: 13,
    color: COLORS.textoSuave,
    marginTop: 4,
    marginBottom: 20,
  },
  gradeAvatares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 20,
  },
  opcaoAvatar: {
    padding: 3,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  opcaoAvatarSelecionada: {
    borderColor: COLORS.amarelo,
  },
  avatarMini: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  botaoFechar: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  botaoFecharTexto: {
    color: COLORS.textoSuave,
    fontWeight: '700',
    fontSize: 14,
  },
});