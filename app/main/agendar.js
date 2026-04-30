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

  const [mes, setMes] = useState(1);
const [ano, setAno] = useState(2026);
const [diaSelecionado, setDiaSelecionado] = useState(3);

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

const diasNoMes = new Date(ano, mes + 1, 0).getDate();
const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

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
          router.replace("/main/financeiro");
        }}
      >
        <Ionicons name="logo-usd" size={20} color="#fff" />
        <Text style={styles.menuItem}>Financeiro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItemRow}
        onPress={() => alert("Pacientes ainda não criado")}
      >
        <Ionicons name="people-outline" size={20} color="#fff" />
        <Text style={styles.menuItem}>Pacientes</Text>
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

       
      
  {/* HEADER DO CALENDÁRIO */}
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
    <TouchableOpacity onPress={() => mudarMes(-1)}>
      <Text>{"<"}</Text>
    </TouchableOpacity>

    <Text style={{ fontWeight: "bold" }}>
      {meses[mes]} {ano}
    </Text>

    <TouchableOpacity onPress={() => mudarMes(1)}>
      <Text>{">"}</Text>
    </TouchableOpacity>
  </View>

  {/* DIAS DA SEMANA */}
  <View style={styles.daysGrid}>
  {[...Array(primeiroDiaSemana)].map((_, i) => (
    <View key={"empty-" + i} style={styles.dayContainer} />
  ))}

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
              diaSelecionado === dia && styles.selectedDayText,
            ]}
          >
            {dia}
          </Text>
        </View>
      </TouchableOpacity>
    );
  })}
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
    <Ionicons name="home-outline" size={24} color="#2563eb" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.replace("/main/agenda")}>
    <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => alert("Pacientes ainda não criado")}>
    <Ionicons name="people-outline" size={24} color="#9ca3af" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.replace("/main/financeiro")}>
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

  daysGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 8,
},

dayContainer: {
  width: "14.2%",
  alignItems: "center",
  marginVertical: 4,
},

dayCircle: {
  width: 34,
  height: 34,
  borderRadius: 17,
  justifyContent: "center",
  alignItems: "center",
},

dayText: {
  color: "#333",
  fontSize: 13,
},

selectedDay: {
  backgroundColor: "#2f80b7",
},

selectedDayText: {
  color: "#fff",
  fontWeight: "bold",
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