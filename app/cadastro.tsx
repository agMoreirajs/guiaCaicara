import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cadastrarUsuario } from '@/src/services/api';
import { COLORS } from '@/src/theme/colors';

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!nome.trim() || !usuario.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    try {
      setCarregando(true);
      await cadastrarUsuario(nome.trim(), usuario.trim(),email.trim(), senha );
      Alert.alert('Conta criada!', 'Agora faça login com seu usuário e senha.', [
        { text: 'Ir para o login', onPress: () => router.back() },
      ]);
    } catch (erro: any) {
      Alert.alert('Erro no cadastro', erro.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: 'Criar conta', headerShadowVisible: false }} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Criar sua conta</Text>
        <Text style={styles.subtitulo}>
          Cadastre-se para salvar suas atrações favoritas na Baixada Santista.
        </Text>

        <View style={styles.formulario}>
          <View style={styles.inputBox}>
            <Ionicons name="id-card-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#8A94A6"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor="#8A94A6"
              autoCapitalize="none"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#8A94A6"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8A94A6"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.azulMarinho} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#8A94A6"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleCadastro}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.textoBotao}>Finalizar cadastro</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
            <Text style={styles.textoVoltar}>Já tenho conta — Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.areia },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 26, fontWeight: '800', color: '#14213D' },
  subtitulo: { fontSize: 14, color: '#6C757D', marginTop: 6, marginBottom: 24 },
  formulario: { gap: 12 },
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
  botaoSalvar: {
    backgroundColor: COLORS.azulMarinho,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  botaoVoltar: { marginTop: 12, alignItems: 'center', paddingVertical: 8 },
  textoVoltar: { color: COLORS.azulMarinho, fontWeight: '600', fontSize: 14 },
});