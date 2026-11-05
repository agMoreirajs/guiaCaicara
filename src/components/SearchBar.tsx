import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/theme/colors';

type Props = {
  value: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar cidades ou atrações...',
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={COLORS.textoSuave} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textoSuave}
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Ionicons name="close-circle" size={20} color={COLORS.textoSuave} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.branco,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.borda,
    gap: 8,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.texto },
});