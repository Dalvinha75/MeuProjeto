import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter(); // Inicializa o navegador

  // Estados para os inputs (o que o professor pediu)
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // A função que faz o botão funcionar
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Se estiver preenchido, envia para a Dashboard
    console.log("Login realizado!");
    router.replace("/main"); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Bem-vinda</Text>
      <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* VERIFIQUE ESTA LINHA: O onPress precisa chamar o handleLogin */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/RegisterScreen")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/ForgotPassword")}>
          <Text style={styles.link}>Recuperar senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 25, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 90, height: 90 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 30 },
  label: { marginBottom: 5, marginTop: 10, color: "#333", fontWeight: "600" },
  input: { backgroundColor: "#F3F4F6", padding: 14, borderRadius: 12, marginBottom: 10 },
  links: { flexDirection: "row", justifyContent: "space-between", marginTop: 25 },
  link: { color: "#20b2f7", fontWeight: "500" },
  button: { backgroundColor: "#1ec3ec", padding: 16, borderRadius: 12, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});