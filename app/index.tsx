import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* LOGO */}
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>B</Text>
          </View>

          <Text style={styles.logoText}>
            Billoro
          </Text>
        </View>

        {/* BADGE */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            ✨ Built for the floor
          </Text>
        </View>

        {/* HEADING */}
        <Text style={styles.heading}>
          Bill, book and track
        </Text>

        <Text style={styles.greenHeading}>
          in three taps.
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Made for shop owners and staff who
          don't have time for menus. Wet hands
          welcome.
        </Text>

        {/* CARDS */}
        <View style={styles.cardsRow}>
          {/* CARD 1 */}
          <View style={styles.card}>
            <View style={styles.iconBg}>
              <Ionicons
                name="receipt-outline"
                size={22}
                color="#146C43"
              />
            </View>

            <Text style={styles.cardText}>
              Invoice
            </Text>
          </View>

          {/* CARD 2 */}
          <View style={styles.card}>
            <View style={styles.iconBg}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#146C43"
              />
            </View>

            <Text style={styles.cardText}>
              Booking
            </Text>
          </View>

          {/* CARD 3 */}
          <View style={styles.card}>
            <View style={styles.iconBg}>
              <Ionicons
                name="bar-chart-outline"
                size={22}
                color="#146C43"
              />
            </View>

            <Text style={styles.cardText}>
              Reports
            </Text>
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>
            Get started
          </Text>
        </TouchableOpacity>

        {/* LOGIN TEXT */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginText}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 40,
  },

  /* LOGO */
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  logoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#146C43",
    justifyContent: "center",
    alignItems: "center",
  },

  logoLetter: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  logoText: {
    marginLeft: 14,
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  /* BADGE */
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 26,
  },

  badgeText: {
    color: "#146C43",
    fontSize: 14,
    fontWeight: "600",
  },

  /* TITLE */
  heading: {
    fontSize: 42,
    fontWeight: "bold",
    lineHeight: 48,
    color: "#111827",
  },

  greenHeading: {
    fontSize: 42,
    fontWeight: "bold",
    lineHeight: 48,
    color: "#146C43",
    marginBottom: 24,
  },

  /* DESCRIPTION */
  description: {
    fontSize: 18,
    lineHeight: 30,
    color: "#4B5563",
    marginBottom: 36,
    paddingRight: 8,
  },

  /* CARDS */
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 42,
  },

  card: {
    width: (screenWidth - 70) / 3,
    backgroundColor: "white",
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  /* BUTTON */
  button: {
    backgroundColor: "#146C43",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "700",
  },

  /* LOGIN */
  loginText: {
    textAlign: "center",
    color: "#4B5563",
    fontSize: 16,
  },
});