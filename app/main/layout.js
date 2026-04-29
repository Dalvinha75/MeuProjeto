import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1 }}>

      {/* MENU GLOBAL */}
      {menuOpen && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setMenuOpen(false)}
          />

          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setMenuOpen(false);
                router.push("/main");
              }}
            >
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setMenuOpen(false);
                router.push("/main/agenda");
              }}
            >
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.text}>Agenda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setMenuOpen(false);
                router.push("/main/financeiro");
              }}
            >
              <Ionicons name="logo-usd" size={20} color="#fff" />
              <Text style={styles.text}>Financeiro</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 40 }} />

            <TouchableOpacity
              style={styles.item}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
              <Text style={[styles.text, { color: "#ff4d4d" }]}>
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* HEADER GLOBAL */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>OdontoCare</Text>

        <Ionicons name="person-circle-outline" size={26} color="#fff" />
      </View>

      {/* TELAS */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* RODAPÉ GLOBAL */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/main")}>
          <Ionicons name="home-outline" size={24} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/agenda")}>
          <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/pacientes")}>
          <Ionicons name="people-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/main/financeiro")}>
          <Ionicons name="logo-usd" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
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

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },

  text: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
});