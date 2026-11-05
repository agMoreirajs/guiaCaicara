import type { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

const ICONES: Record<string, [IconName, IconName]> = {
  index: ['compass', 'compass-outline'],
  favoritos: ['heart', 'heart-outline'],
  perfil: ['person', 'person-outline'],
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.azulMarinho,
        tabBarInactiveTintColor: COLORS.textoSuave,
        tabBarStyle: { backgroundColor: COLORS.branco, borderTopColor: COLORS.borda },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const [ativo, inativo] = ICONES[route.name] ?? ['ellipse', 'ellipse-outline'];
          return <Ionicons name={focused ? ativo : inativo} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Explora' }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}