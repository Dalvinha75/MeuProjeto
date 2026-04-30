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

export default function Agenda() {
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState(2026);
  const [diaSelecionado, setDiaSelecionado] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ FALTAVA ISSO
  const router = useRouter();

  const handleLogout = async () => {
  await AsyncStorage.removeItem("user");
  router.replace("/login");
};

  const meses = [
    "Janeiro","Fevereiro","Março","Abril",
    "Maio","Junho","Julho","Agosto",
    "Setembro","Outubro","Novembro","Dezembro"
  ];

  const mudarMes = (direcao) => {
    let novoMes = mes + direcao;
    if (novoMes < 0) novoMes = 11;
    if (novoMes > 11) novoMes = 0;
    setMes(novoMes);
  };

  const consultasPorDia = {
    3: [
      { id: "1", nome: "Carlos Oliveira", hora: "08:00", status: "Confirmado" },
      { id: "2", nome: "Letícia Amorim", hora: "08:00", status: "Pendente" },
    ],
    5: [
      { id: "3", nome: "Ana Souza", hora: "10:00", status: "Confirmado" },
    ],
  };

  const consultas = consultasPorDia[diaSelecionado] || [];

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

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
    onPress={() => {
      setMenuOpen(false);
      router.replace("/main/agenda");
    }}
  >
    <Ionicons name="calendar-outline" size={20} color="#fff" />
    <Text style={styles.menuItem}>Agenda</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.menuItemRow}
    onPress={() => {
      setMenuOpen(false);
      router.replace("/main/pacientes");
    }}
  >
    <Ionicons name="people-outline" size={20} color="#fff" />
    <Text style={styles.menuItem}>Pacientes</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.menuItemRow}
    onPress={() => {
      setMenuOpen(false);
      router.replace("/main/financeiro");
    }}
  >
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
        <Text style={styles.title}>Agenda</Text>

        {/* CALENDÁRIO */}
    <View style={styles.calendar}>
  <View style={styles.calendarHeader}>
    <TouchableOpacity onPress={() => mudarMes(-1)}>
      <Text>{"<"}</Text>
    </TouchableOpacity>

    <Text style={styles.month}>
      {meses[mes]} {ano}
    </Text>

    <TouchableOpacity onPress={() => mudarMes(1)}>
      <Text>{">"}</Text>
    </TouchableOpacity>
  </View>

  {/* DIAS DA SEMANA */}
  <View style={styles.week}>
    {["D","S","T","Q","Q","S","S"].map((d,i) => (
      <Text key={i} style={styles.day}>{d}</Text>
    ))}
  </View>

  {/* GRID */}
  <View style={styles.daysGrid}>
    
    {/* ESPAÇOS */}
    {[...Array(primeiroDiaSemana)].map((_, i) => (
      <View key={"empty-" + i} style={styles.dayContainer} />
    ))}

    {/* DIAS */}
    {[...Array(diasNoMes)].map((_, i) => {
      const dia = i + 1;

      return (
        <TouchableOpacity
          key={dia}
          style={styles.dayContainer}
          onPress={() => setDiaSelecionado(dia)}
        >
          <View
            style={[
              styles.dayCircle,
              diaSelecionado === dia && styles.selectedDay,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                diaSelecionado === dia && { color: "#fff" },
              ]}
            >
              {dia}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
</View>
          

        {/* CONSULTAS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Consultas em {diaSelecionado.toString().padStart(2,"0")}/
            {(mes+1).toString().padStart(2,"0")}/{ano}
          </Text>

          {consultas.length === 0 ? (
            <Text style={{ color: "#777", textAlign: "center", marginTop: 10 }}>
              Nenhuma consulta para este dia
            </Text>
          ) : (
            consultas.map((item) => (
              <View key={item.id} style={styles.consulta}>
                <View>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.hora}>{item.hora}</Text>
                </View>

                <View
                  style={
                    item.status === "Confirmado"
                      ? styles.confirmado
                      : styles.pendente
                  }
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* BOTÃO FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/main/agendar")}
>
        <Ionicons name="add" size={30} color="#fff" />
    </TouchableOpacity>

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

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  calendar: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  month: { fontWeight: "bold" },

  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  day: {
    width: "14%",
    textAlign: "center",
    color: "#666",
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayContainer: {
    width: "14%",
    alignItems: "center",
    marginVertical: 4,
  },

  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: { color: "#333" },

  selectedDay: {
    backgroundColor: "#2f80b7",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  consulta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  nome: { fontWeight: "bold" },

  hora: { color: "#777" },

  confirmado: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  pendente: {
    backgroundColor: "#FFA726",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2f80b7",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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