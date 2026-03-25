import { Stack } from 'expo-router';

export default function Layout() {
  // Trocando Tabs por Stack temporariamente para testar se a tela aparece
  return <Stack screenOptions={{ headerShown: false }} />;
}