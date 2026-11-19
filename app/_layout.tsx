import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/src/context/AuthContext';
import { COLORS } from '@/src/theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTintColor: COLORS.azulMarinho,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: COLORS.areia },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="cidade/[id]" options={{ title: 'Cidade' }} />
          <Stack.Screen name="atracao/[id]" options={{ title: 'Atração' }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}