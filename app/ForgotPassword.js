import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Crie uma nova senha para acessar o sistema.
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput style={styles.input} secureTextEntry placeholder="Sua nova senha" />

      <Text style={styles.label}>Confirme a senha</Text>
      <TextInput style={styles.input} secureTextEntry placeholder="Repita a nova senha" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', color: '#666' }}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... use os mesmos estilos das outras telas para manter o padrão
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 90, height: 90 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 25 },
  label: { marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: "#F3F4F6", padding: 14, borderRadius: 12 },
  button: { backgroundColor: "#3B82F6", padding: 16, borderRadius: 12, marginTop: 30 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" }
});