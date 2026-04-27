import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const [menuOpen, setMenuOpen] = useState(false);

export default function Dashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

  const consultas = [
    { id: "1", paciente: "Carlos Oliveira", hora: "9:00", status: "Confirmado" },
    { id: "2", paciente: "Letícia Amorim", hora: "10:00", status: "Confirmado" },
    { id: "3", paciente: "Kátia Azevedo", hora: "14:00", status: "Pendente" },
    { id: "4", paciente: "Danilo Dantas", hora: "15:00", status: "Confirmado" },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* MENU */}
      {menuOpen && (
        <>
          {/* FUNDO ESCURO */}
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setMenuOpen(false)}
          />

          {/* MENU LATERAL */}
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItemRow}>
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemRow}>
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Agenda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemRow}>
              <Ionicons name="person-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Cadastro</Text>
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

            <TouchableOpacity style={styles.menuItemRow}>
              <Ionicons name="settings-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Sua conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.menuItemRow}
               onPress={() => {
                setMenuOpen(false);
                router.push("/main/agenda");
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
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.appName}>OdontoCare</Text>

        <Ionicons name="person-circle-outline" size={28} color="#fff" />
      </View>

      {/* CONTEÚDO */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>

        <Text style={styles.section}>Resumo</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.number}>2</Text>
            <Text>Consultas hoje</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>10</Text>
            <Text>Pacientes</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Próximas consultas
          </Text>

          {consultas.map((c) => (
            <View key={c.id} style={styles.item}>
              <View>
                <Text style={{ fontWeight: "bold" }}>{c.paciente}</Text>
                <Text style={{ color: "#777" }}>{c.hora}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      c.status === "Confirmado" ? "#4CAF50" : "#FFA726",
                  },
                ]}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {c.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* AÇÕES */}
        <Text style={styles.section}>Ações Rápidas</Text>

        <View style={styles.actions}>
          <View style={styles.action}>
            <Ionicons name="calendar-outline" size={28} color="#2563eb" />
            <Text>Agenda</Text>
          </View>

          <View style={styles.action}>
            <Ionicons name="people-outline" size={28} color="#2563eb" />
            <Text>Pacientes</Text>
          </View>

          <View style={styles.action}>
            <Ionicons name="person-add-outline" size={28} color="#2563eb" />
            <Text>Cadastro</Text>
          </View>

          <View style={styles.action}>
            <Ionicons name="logo-usd" size={28} color="#2563eb" />
            <Text>Financeiro</Text>
          </View>

          <View style={styles.action}>
      <TouchableOpacity onPress={() => router.push("/main/agenda")}>
      <Ionicons name="calendar-outline" size={28} color="#2563eb" />
      <Text>Agenda</Text>
      </TouchableOpacity>
        </View>
        </View>
      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="#2563eb" />
        <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
        <Ionicons name="people-outline" size={24} color="#9ca3af" />
        <Ionicons name="logo-usd" size={24} color="#9ca3af" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  header: {
    backgroundColor: "#2563eb",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  appName: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  content: { padding: 20 },

  title: { fontSize: 22, fontWeight: "bold" },

  section: { marginTop: 15, fontWeight: "600" },

  row: { flexDirection: "row", justifyContent: "space-between" },

  card: {
    width: "48%",
    backgroundColor: "#e5e7eb",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  number: { fontSize: 22, fontWeight: "bold" },

  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  action: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
  },

  footer: {
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