import { useRouter } from "expo-router";
import { useState } from "react"; // 1. Importamos o useState
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();

  // 2. Criamos os estados para cada campo do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // 3. Função que será chamada ao clicar em Cadastrar
  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmaSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    // Se chegar aqui, está tudo certo!
    console.log("Dados capturados:", { nome, email, senha });
    Alert.alert("Sucesso", `Bem-vinda, ${nome}!`);
    
    // Navega para a área interna
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Informe seus dados para o sistema.</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Seu nome"
        value={nome} // O valor vem do estado
        onChangeText={setNome} // Atualiza o estado ao digitar
      />

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input} 
        placeholder="exemplo@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Confirme Senha</Text>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Repita a senha"
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Já tenho conta? Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 90, height: 90 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 25 },
  label: { marginBottom: 5, marginTop: 10, fontWeight: "600" },
  input: { backgroundColor: "#F3F4F6", padding: 14, borderRadius: 12 },
  button: { backgroundColor: "#1eb2ec", padding: 16, borderRadius: 12, marginTop: 30 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  backButton: { marginTop: 20, alignItems: "center" },
  backButtonText: { color: "#666" },
});