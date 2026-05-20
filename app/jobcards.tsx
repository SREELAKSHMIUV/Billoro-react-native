import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Footer from "../components/Footer";

export default function JobCardsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.heading}>
                Job cards
              </Text>

              <Text style={styles.subHeading}>
                3 active
              </Text>
            </View>

            <TouchableOpacity style={styles.newButton}>
              <Ionicons
                name="add"
                size={16}
                color="white"
              />

              <Text style={styles.newButtonText}>
                New
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* JOB CARDS */}
          {[
            {
              id: "JC-118",
              status: "Started",
              name: "Rahul Sharma",
              vehicle: "MH 12 AB 1234",
              km: "45,230",
              fuel: "60%",
              advisor: "Amit",
              button: "Mark complete",
            },

            {
              id: "JC-117",
              status: "Open",
              name: "Priya Patel",
              vehicle: "MH 14 CD 5678",
              km: "23,110",
              fuel: "30%",
              advisor: "Ravi",
              button: "Start work",
            },

            {
              id: "JC-116",
              status: "Completed",
              name: "Arjun Mehta",
              vehicle: "MH 02 EF 9012",
              km: "61,900",
              fuel: "80%",
              advisor: "Suresh",
              button: "Completed",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={styles.card}
            >
              {/* TOP */}
              <View style={styles.topRow}>
                <View>
                  <View style={styles.idRow}>
                    <Text style={styles.jobId}>
                      {item.id}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,

                        item.status ===
                          "Completed" && {
                          backgroundColor:
                            "#DFF3EA",
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.dot,

                          item.status ===
                            "Completed" && {
                            backgroundColor:
                              "#22C55E",
                          },
                        ]}
                      />

                      <Text
                        style={[
                          styles.statusText,

                          item.status ===
                            "Completed" && {
                            color: "#16A34A",
                          },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.customerName}>
                    {item.name}
                  </Text>

                  <View style={styles.vehicleRow}>
                    <Ionicons
                      name="car-outline"
                      size={14}
                      color="#6B7280"
                    />

                    <Text style={styles.vehicleText}>
                      {item.vehicle}
                    </Text>
                  </View>
                </View>

                <View style={styles.iconCircle}>
                  <Ionicons
                    name="construct-outline"
                    size={22}
                    color="#146C43"
                  />
                </View>
              </View>

              {/* STATS */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Ionicons
                    name="speedometer-outline"
                    size={14}
                    color="#6B7280"
                  />

                  <Text style={styles.statLabel}>
                    KM
                  </Text>

                  <Text style={styles.statValue}>
                    {item.km}
                  </Text>
                </View>

                <View style={styles.statBox}>
                  <Ionicons
                    name="battery-half-outline"
                    size={14}
                    color="#6B7280"
                  />

                  <Text style={styles.statLabel}>
                    FUEL
                  </Text>

                  <Text style={styles.statValue}>
                    {item.fuel}
                  </Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>
                    ADVISOR
                  </Text>

                  <Text style={styles.statValue}>
                    {item.advisor}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              {/* BUTTONS */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.mainButton,

                    item.status ===
                      "Completed" && {
                      backgroundColor:
                        "#22C55E",
                    },
                  ]}
                >
                  <Text style={styles.mainButtonText}>
                    {item.button}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewButton}
                >
                  <Text style={styles.viewButtonText}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* FOOTER */}
        <Footer active="Job Cards" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subHeading: {
    color: "#6B7280",
    marginTop: 2,
    fontSize: 14,
  },

  newButton: {
    backgroundColor: "#146C43",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },

  newButtonText: {
    color: "white",
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  idRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  jobId: {
    color: "#146C43",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 8,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDEBD3",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8B5E3C",
    marginRight: 4,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8B5E3C",
  },

  customerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 10,
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  vehicleText: {
    color: "#6B7280",
    marginLeft: 4,
    fontSize: 13,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#DFF3EA",
    justifyContent: "center",
    alignItems: "center",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statBox: {
    width: "31%",
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
  },

  statLabel: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 2,
  },

  statValue: {
    fontWeight: "700",
    fontSize: 20,
    marginTop: 6,
    color: "#111827",
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mainButton: {
    flex: 1,
    backgroundColor: "#146C43",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    marginRight: 10,
  },

  mainButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  viewButton: {
    width: 86,
    backgroundColor: "#EEF2F1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },

  viewButtonText: {
    fontWeight: "600",
    color: "#111827",
    fontSize: 15,
  },
});