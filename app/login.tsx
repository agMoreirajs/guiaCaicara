import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as apiService from '../src/services/api';
import { COLORS } from '@/src/theme/colors';
import { useAuth } from '@/src/context/AuthContext';

const API_BASE_URL = 'http://10.0.2.2/api-roteiro'; // Certifique-se de que esta URL corresponde à sua configuração do servidor

async function lerRespostaSegura(resposta: Response) {
  const texto = await resposta.text();
  try {
    return JSON.parse(texto);
  } catch {
    throw new Error(
      texto.trim().startsWith('<')
        ? 'O servidor retornou HTML/erro do PHP. Verifique solicitar_codigo.php e conexao.php.'
        : 'Resposta inválida do servidor.'
    );
  }
}

export default function LoginScreen() {
  const router = useRouter();
  const authContext = useAuth() as any;

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [modalRecuperacaoVisivel, setModalRecuperacaoVisivel] = useState(false);
  const [etapaRecuperacao, setEtapaRecuperacao] = useState<'email' | 'codigo'>('email');
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [codigoRecuperacao, setCodigoRecuperacao] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [enviandoRecuperacao, setEnviandoRecuperacao] = useState(false);

  const handleLogin = async () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Informe seu usuário e sua senha.');
      return;
    }

    const funcaoLogin = (apiService as any).fazerLogin;
    if (typeof funcaoLogin !== 'function') {
      Alert.alert(
        'Erro ao entrar',
        'A função fazerLogin não foi encontrada em ../src/services/api.'
      );
      return;
    }

    const funcaoEntrar =
      authContext?.entrar ?? authContext?.login ?? authContext?.signIn;

    try {
      setCarregando(true);
      const dadosUsuario = await funcaoLogin(usuario.trim(), senha);

      if (typeof funcaoEntrar === 'function') {
        await funcaoEntrar({
          ...dadosUsuario,
          foto_perfil: dadosUsuario?.foto_perfil ?? '',
        });
      }

         router.navigate('/(tabs)');
    } catch (erro: any) {
      Alert.alert('Erro ao entrar', erro?.message || 'Não foi possível fazer login.');
    } finally {
      setCarregando(false);
    }
  };

  const abrirModalRecuperacao = () => {
    setEtapaRecuperacao('email');
    setCodigoRecuperacao('');
    setNovaSenha('');
    setModalRecuperacaoVisivel(true);
  };

  const fecharModalRecuperacao = () => {
    if (enviandoRecuperacao) return;
    setModalRecuperacaoVisivel(false);
  };

  const handleSolicitarCodigo = async () => {
    const emailLimpo = emailRecuperacao.trim();
    if (!emailLimpo) {
      Alert.alert('Atenção', 'Informe o e-mail cadastrado na sua conta.');
      return;
    }

    try {
      setEnviandoRecuperacao(true);
      const resposta = await fetch(`${API_BASE_URL}/solicitar_codigo.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLimpo }),
      });
      const dados = await lerRespostaSegura(resposta);

      if (!resposta.ok) {
        Alert.alert('Erro', dados.erro || 'Não foi possível enviar o código.');
        return;
      }

      Alert.alert('Código enviado', dados.mensagem || 'Verifique seu e-mail.');
      setEtapaRecuperacao('codigo');
    } catch (erro: any) {
      Alert.alert('Erro de conexão', erro?.message || 'Não foi possível falar com o servidor.');
    } finally {
      setEnviandoRecuperacao(false);
    }
  };

  const handleRedefinirSenha = async () => {
    const emailLimpo = emailRecuperacao.trim();
    const codigoLimpo = codigoRecuperacao.trim();

    if (!codigoLimpo || !novaSenha.trim()) {
      Alert.alert('Atenção', 'Preencha o código recebido e a nova senha.');
      return;
    }

    try {
      setEnviandoRecuperacao(true);
      const resposta = await fetch(`${API_BASE_URL}/redefinir_senha.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailLimpo,
          codigo: codigoLimpo,
          nova_senha: novaSenha,
        }),
      });
      const dados = await lerRespostaSegura(resposta);

      if (!resposta.ok) {
        Alert.alert('Erro', dados.erro || 'Não foi possível redefinir a senha.');
        return;
      }

      Alert.alert('Sucesso', dados.mensagem || 'Senha redefinida! Agora faça login.');
      setModalRecuperacaoVisivel(false);
      setSenha('');
    } catch (erro: any) {
      Alert.alert('Erro de conexão', erro?.message || 'Não foi possível falar com o servidor.');
    } finally {
      setEnviandoRecuperacao(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../src/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>ROTEIRO CAIÇARA</Text>
        <Text style={styles.subtitulo}>BAIXADA SANTISTA</Text>
        <Text style={styles.descricao}>
          Entre na sua conta para explorar as praias, histórias e salvar seus roteiros.
        </Text>

        <View style={styles.formulario}>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#8A94A6"
              autoCapitalize="none"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8A94A6"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#8A94A6"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={handleLogin}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                <Ionicons name="compass-outline" size={20} color="#F5B841" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.linhaRecuperacao}>
            <Text style={styles.textoRecuperacao}>Esqueceu sua senha? </Text>
            <TouchableOpacity onPress={abrirModalRecuperacao}>
              <Text style={styles.linkRecuperacao}>Clique e redefina</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.botaoCadastro}
            onPress={() => router.push('/cadastro')}
          >
            <Text style={styles.textoSecundario}>
              Não tem uma conta? <Text style={styles.linkCadastro}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalRecuperacaoVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModalRecuperacao}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Recuperar senha</Text>
            <Text style={styles.modalDescricao}>
              {etapaRecuperacao === 'email'
                ? 'Digite o e-mail da sua conta para receber o código de verificação.'
                : `Enviamos um código para ${emailRecuperacao.trim()}. Digite-o abaixo junto com sua nova senha.`}
            </Text>

            {etapaRecuperacao === 'email' ? (
              <>
                <View style={styles.inputBox}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.azulMarinho} />
                  <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#8A94A6"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailRecuperacao}
                    onChangeText={setEmailRecuperacao}
                  />
                </View>

                <TouchableOpacity
                  style={styles.botaoModalPrincipal}
                  onPress={handleSolicitarCodigo}
                  disabled={enviandoRecuperacao}
                >
                  {enviandoRecuperacao ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.textoBotaoModal}>Enviar código</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputBox}>
                  <Ionicons name="key-outline" size={20} color={COLORS.azulMarinho} />
                  <TextInput
                    style={styles.input}
                    placeholder="Código de 6 dígitos"
                    placeholderTextColor="#8A94A6"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={codigoRecuperacao}
                    onChangeText={setCodigoRecuperacao}
                  />
                </View>

                <View style={styles.inputBox}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.azulMarinho} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    placeholderTextColor="#8A94A6"
                    secureTextEntry
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                  />
                </View>

                <TouchableOpacity
                  style={styles.botaoModalPrincipal}
                  onPress={handleRedefinirSenha}
                  disabled={enviandoRecuperacao}
                >
                  {enviandoRecuperacao ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.textoBotaoModal}>Salvar nova senha</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoVoltarEtapa}
                  onPress={() => setEtapaRecuperacao('email')}
                  disabled={enviandoRecuperacao}
                >
                  <Text style={styles.textoVoltarEtapa}>Alterar e-mail</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.botaoFecharModal}
              onPress={fecharModalRecuperacao}
              disabled={enviandoRecuperacao}
            >
              <Text style={styles.textoBotaoFechar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.areia || '#F7F4EC',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.azulMarinho || '#12355B',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    color: '#64748B',
    letterSpacing: 2,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    textAlign: 'center',
    color: '#475569',
    marginBottom: 24,
    lineHeight: 20,
  },
  formulario: {
    gap: 14,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  botaoEntrar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.azulMarinho || '#12355B',
    height: 52,
    borderRadius: 12,
    gap: 8,
    marginTop: 4,
  },
  textoBotaoEntrar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  linhaRecuperacao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  textoRecuperacao: {
    fontSize: 14,
    color: '#475569',
  },
  linkRecuperacao: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.azulMarinho || '#12355B',
  },
  botaoCadastro: {
    marginTop: 8,
    alignItems: 'center',
  },
  textoSecundario: {
    fontSize: 14,
    color: '#475569',
  },
  linkCadastro: {
    fontWeight: '700',
    color: COLORS.azulMarinho || '#12355B',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.azulMarinho || '#12355B',
  },
  modalDescricao: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  botaoModalPrincipal: {
    backgroundColor: COLORS.azulMarinho || '#12355B',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  textoBotaoModal: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  botaoVoltarEtapa: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  textoVoltarEtapa: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.azulMarinho || '#12355B',
  },
  botaoFecharModal: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  textoBotaoFechar: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
});