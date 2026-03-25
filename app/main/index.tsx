import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export default function Dashboard() {
  const router = useRouter();

  // O useState que o seu professor quer ver (Lista de consultas)
  const [consultas, setConsultas] = useState([
    { id: "1", paciente: "Carlos Oliveira", hora: "9:00", status: "Confirmado" },
    { id: "2", paciente: "Carlos Oliveira", hora: "10:00", status: "Confirmado" },
    { id: "3", paciente: "Carlos Oliveira", hora: "14:00", status: "Pendente" },
    { id: "4", paciente: "Carlos Oliveira", hora: "15:00", status: "Confirmado" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Azul Arredondado do seu Protótipo */}
      <View style={styles.headerBlue}>
        <Ionicons name="menu" size={32} color="white" />
        <TouchableOpacity onPress={() => router.replace("/LoginScreen")}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Dashboard</Text>

        {/* Seção Resumo (Cards Lado a Lado) */}
        <Text style={styles.sectionTitle}>Resumo</Text>
        <View style={styles.resumoContainer}>
            <View style={styles.resumoCard}>
                <Text style={styles.resumoNumber}>2</Text>
                <Text style={styles.resumoLabel}>Consultas hoje</Text>
            </View>
            <View style={styles.resumoCard}>
                <Text style={styles.resumoNumber}>10</Text>
                <Text style={styles.resumoLabel}>Pacientes</Text>
            </View>
        </View>

        {/* Lista de Consultas (Onde o useState brilha) */}
        <View style={styles.agendaContainer}>
          <Text style={styles.agendaTitle}>Próximas consultas do dia</Text>
          
          {consultas.map((item) => (
            <View key={item.id} style={styles.consultaItem}>
              <View>
                <Text style={styles.pacienteNome}>{item.paciente}</Text>
                <Text style={styles.pacienteHora}>{item.hora}</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === "Confirmado" ? "#65a34a" : "#ffb347" }
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botões de Ações Rápidas com ícones azuis */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.gridAcoes}>
            <View style={styles.acaoCard}><Ionicons name="calendar-outline" size={35} color="#3b82f6" /></View>
            <View style={styles.acaoCard}><Ionicons name="stats-chart-outline" size={35} color="#3b82f6" /></View>
            <View style={styles.acaoCard}><Ionicons name="document-text-outline" size={35} color="#3b82f6" /></View>
            <View style={styles.acaoCard}><Ionicons name="person-add-outline" size={35} color="#3b82f6" /></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: { flex: 1, padding: 20 },
  mainTitle: { fontSize: 24, fontWeight: "bold", marginTop: 10, color: "#111" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, marginTop: 15 },
  resumoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  resumoCard: { backgroundColor: "#ececec", width: "48%", padding: 20, borderRadius: 20 },
  resumoNumber: { fontSize: 28, fontWeight: "bold" },
  resumoLabel: { color: "#666", fontSize: 14 },
  agendaContainer: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 25, 
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  agendaTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 20 },
  consultaItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  pacienteNome: { fontSize: 15, fontWeight: "bold" },
  pacienteHora: { color: "#888", fontSize: 13 },
  statusBadge: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 15 },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  gridAcoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    marginBottom: 40
  },
  acaoCard: { width: "48%", height: 90, justifyContent: "center", alignItems: "center" }
});