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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

 const handleLogin = async () => {
  console.log("INICIO LOGIN");

  if (!email || !senha) {
    alert("Preencha os campos");
    return;
  }

  try {
    const userData = await AsyncStorage.getItem("user");
    console.log("USER DATA:", userData);

    if (!userData) {
      alert("Usuário não encontrado");
      return;
    }

    const user = JSON.parse(userData);
    console.log("USER:", user);

    if (email === user.email && senha === user.senha) {
      router.replace("/main");
    } else {
      alert("Email ou senha inválidos");
    }
  } catch (e) {
    console.log(e);
    alert("Erro no login");
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
      </View>

      <Text style={styles.title}>Bem-vinda</Text>
      <Text style={styles.subtitle}>
        Acesse sua conta para continuar
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot")}>
          <Text style={styles.link}>Recuperar senha</Text>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  label: {
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "600",
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
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  link: {
    color: "#20b2f7",
    fontWeight: "500",
  },
});