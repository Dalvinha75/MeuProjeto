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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    const user = { nome, email, senha };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Sucesso", "Cadastro realizado!");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar usuário");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/odontologia.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>OdontoCare</Text>
      </View>

      {/* TEXTO */}
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>
        Informe seus dados para acessar o sistema
      </Text>

      {/* INPUTS */}
      <TextInput
        placeholder="Nome Completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="Confirmar senha"
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* LINK */}
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },

  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#1ec3ec",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#20b2f7",
    fontWeight: "500",
  },
});