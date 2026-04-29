import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Financeiro() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

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
                router.push("/main");
              }}
            >
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemRow}
              onPress={() => {
                setMenuOpen(false);
                router.push("/main/agenda");
              }}
            >
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

      {/* CONTEÚDO */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Financeiro</Text>

        {/* RESUMO */}
        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: "#d1fae5" }]}>
            <Text style={styles.valor}>R$ 1.150</Text>
            <Text>Recebidos no mês</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#fef3c7" }]}>
            <Text style={styles.valor}>2</Text>
            <Text>Orçamentos criados</Text>
          </View>
        </View>

        {/* ORÇAMENTOS */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Orçamentos</Text>

          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>Carlos Oliveira</Text>
              <Text style={styles.sub}>1x - Faceta</Text>
            </View>
            <Text>R$ 500</Text>
            <View style={styles.pendente}>
              <Text style={styles.statusText}>Pendente</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>Ana Oliveira</Text>
              <Text style={styles.sub}>3x - Restauração</Text>
            </View>
            <Text>R$ 450</Text>
            <View style={styles.pendente}>
              <Text style={styles.statusText}>Pendente</Text>
            </View>
          </View>
        </View>

        {/* PAGAMENTOS */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Pagamentos Recentes</Text>

          <Text style={styles.pagamento}>
            R$ 250,00 - Parcela 1{"\n"}
            12/02/2026 - Ricardo Novaes (Faceta) • PIX
          </Text>

          <Text style={styles.pagamento}>
            R$ 250,00 - Parcela 1{"\n"}
            12/02/2026 - Ricardo Novaes (Faceta)
          </Text>
        </View>
      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/main")}>
          <Ionicons name="home-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/agenda")}>
          <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/pacientes")}>
          <Ionicons name="people-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/financeiro")}>
          <Ionicons name="logo-usd" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

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

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
  },

  valor: { fontSize: 18, fontWeight: "bold" },

  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  boxTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  nome: { fontWeight: "bold" },

  sub: { color: "#777", fontSize: 12 },

  pendente: {
    backgroundColor: "#fb923c",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  statusText: { color: "#fff", fontSize: 12 },

  pagamento: {
    marginBottom: 10,
    color: "#374151",
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