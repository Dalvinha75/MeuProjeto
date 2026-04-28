import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Agendar() {
  const router = useRouter();

  const handleLogout = async () => {
  await AsyncStorage.removeItem("user");
  router.replace("/login");
};

  const [menuOpen, setMenuOpen] = useState(false); // ✅ ADICIONADO

  const [profissional, setProfissional] = useState("Ana");
  const [hora, setHora] = useState("07:00");
  const [sala, setSala] = useState("1");

  const horarios = [
    "07:00","08:00","09:00","10:00",
    "11:00","14:00","15:00","16:00",
    "17:00","18:00","19:00"
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* MENU */}
      {menuOpen && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setMenuOpen(false)}
          />

          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => {
                setMenuOpen(false);
                router.replace("/main");
              }}
            >
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => setMenuOpen(false)}
            >
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Agenda</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 60 }} />

            <TouchableOpacity
                style={styles.menuItemRow}
                onPress={async () => {
                    setMenuOpen(false);
                    await handleLogout();
  }}
>
  <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
  <Text style={[styles.menuItem, { color: "#ff4d4d" }]}>
    Sair
  </Text>
</TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => alert("Pacientes")}
            >
              <Ionicons name="people-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Pacientes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => alert("Financeiro")}
            >
              <Ionicons name="logo-usd" size={20} color="#fff" />
              <Text style={styles.menuItem}>Financeiro</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menu}>

  {/* ITENS DO MENU */}
  <TouchableOpacity style={styles.menuItemRow}>
    <Ionicons name="home-outline" size={20} color="#fff" />
    <Text style={styles.menuItem}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItemRow}>
    <Ionicons name="calendar-outline" size={20} color="#fff" />
    <Text style={styles.menuItem}>Agenda</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItemRow}>
    <Ionicons name="people-outline" size={20} color="#fff" />
    <Text style={styles.menuItem}>Pacientes</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItemRow}>
    <Ionicons name="logo-usd" size={20} color="#fff" />
    <Text style={styles.menuItem}>Financeiro</Text>
  </TouchableOpacity>

  
  <View style={{ marginTop: 40 }} />

 
  <TouchableOpacity
    style={styles.menuItemRow}
    onPress={async () => {
      setMenuOpen(false);
      await handleLogout();
    }}
  >
    <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
    <Text style={[styles.menuItem, { color: "#ff4d4d" }]}>
      Sair
    </Text>
  </TouchableOpacity>

</View>
        </>
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>OdontoCare</Text>

        <Ionicons name="person-circle-outline" size={26} color="#fff" />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Agendar consulta</Text>

        {/* CALENDÁRIO */}
        <View style={styles.card}>
          <Text style={styles.label}>Data</Text>
          <Text style={{ textAlign: "center" }}>Fevereiro 2026</Text>
        </View>

        {/* PACIENTE */}
        <View style={styles.card}>
          <Text style={styles.label}>Paciente</Text>
          <TextInput
            placeholder="Digite o nome do paciente"
            style={styles.input}
          />
        </View>

        {/* PROFISSIONAL */}
        <View style={styles.card}>
          <Text style={styles.label}>Profissional</Text>
          <View style={styles.row}>
            {["Ana","Luiza"].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.tag,
                  profissional === p && styles.selectedTag,
                ]}
                onPress={() => setProfissional(p)}
              >
                <Text style={profissional === p && { color: "#fff" }}>
                  Dra. {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* HORÁRIOS */}
        <View style={styles.card}>
          <Text style={styles.label}>Horário</Text>
          <View style={styles.rowWrap}>
            {horarios.map((h) => (
              <TouchableOpacity
                key={h}
                style={[
                  styles.tag,
                  hora === h && styles.selectedTag,
                ]}
                onPress={() => setHora(h)}
              >
                <Text style={hora === h && { color: "#fff" }}>
                  {h}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SALA */}
        <View style={styles.card}>
          <Text style={styles.label}>Sala</Text>
          <View style={styles.row}>
            {["1","2","3","4"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.tag,
                  sala === s && styles.selectedTag,
                ]}
                onPress={() => setSala(s)}
              >
                <Text style={sala === s && { color: "#fff" }}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.replace("/main")}>
          <Ionicons name="home-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/main/agenda")}>
          <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="people-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="logo-usd" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e5e5e5" },

  header: {
    backgroundColor: "#2f80b7",
    height: 90,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  content: { padding: 20 },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  label: {
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    margin: 4,
  },

  selectedTag: {
    backgroundColor: "#2f80b7",
  },

  button: {
    backgroundColor: "#2f80b7",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 80, // espaço pro footer
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },

  menu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#9ca3af",
    padding: 20,
    zIndex: 2,
  },

  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },

  menuItem: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});