import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* TOP CONTENT */}
      <View>
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>B</Text>
          </View>

          <Text style={styles.logoName}>Billoro</Text>
        </View>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Built for the floor</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>
          Bill, book and track{"\n"}
          <Text style={styles.greenText}>in three taps.</Text>
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Made for shop owners and staff who don't have time for menus.
          Wet hands welcome.
        </Text>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Ionicons
              name="receipt-outline"
              size={28}
              color="#1B6E4B"
            />
            <Text style={styles.cardText}>Invoice</Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name="calendar-outline"
              size={28}
              color="#1B6E4B"
            />
            <Text style={styles.cardText}>Booking</Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name="bar-chart-outline"
              size={28}
              color="#1B6E4B"
            />
            <Text style={styles.cardText}>Reports</Text>
          </View>
        </View>
      </View>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginText}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 28,
    paddingTop: 50,
    justifyContent: "space-between",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },

  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1B6E4B",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  logoName: {
    marginLeft: 12,
    fontSize: 24,
    fontWeight: "600",
  },

  badge: {
    backgroundColor: "#DFF3EA",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 25,
  },

  badgeText: {
    color: "#1B6E4B",
    fontWeight: "600",
  },

  heading: {
    fontSize: 38,
    fontWeight: "bold",
    lineHeight: 48,
    color: "#111",
  },

  greenText: {
    color: "#1B6E4B",
  },

  description: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 28,
    color: "#555",
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  card: {
    width: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },

  cardText: {
    marginTop: 14,
    fontWeight: "600",
  },

  bottomSection: {
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#1B6E4B",
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
});