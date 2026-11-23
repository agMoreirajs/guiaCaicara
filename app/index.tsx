import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { fazerLogin } from '../src/services/api';
import { COLORS } from '@/src/theme/colors';
import { useAuth } from '@/src/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

const { entrar } = useAuth();

const handleLogin = async () => {
  if (!usuario.trim() || !senha.trim()) {
    Alert.alert('Atenção', 'Informe seu usuário e sua senha.');
    return;
  }

  try {
    setCarregando(true);
    const dadosUsuario = await fazerLogin(usuario.trim(), senha);
    await entrar(dadosUsuario);
    router.push('/(tabs)');
  } catch (erro: any) {
    Alert.alert('Erro ao entrar', erro.message || 'Não foi possível fazer login.');
  } finally {
    setCarregando(false);
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.areia },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: { width: 130, height: 130, marginBottom: 12 },
  titulo: { fontSize: 24, fontWeight: '800', color: '#14213D', letterSpacing: 1 },
  subtitulo: { fontSize: 13, fontWeight: '700', color: '#0088CC', letterSpacing: 2, marginTop: 2 },
  descricao: {
    textAlign: 'center',
    color: '#6C757D',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  formulario: { width: '100%', gap: 12 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.texto },
  botaoEntrar: {
    backgroundColor: COLORS.azulMarinho,
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  textoBotaoEntrar: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  botaoCadastro: { marginTop: 12, alignItems: 'center', paddingVertical: 8 },
  textoSecundario: { color: '#6C757D', fontSize: 14 },
  linkCadastro: { color: COLORS.azulMarinho, fontWeight: '700' },
});