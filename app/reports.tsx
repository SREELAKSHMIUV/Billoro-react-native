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

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* HEADER */}
          <View>
            <Text style={styles.heading}>
              Reports
            </Text>

            <Text style={styles.subHeading}>
              Insights at a glance
            </Text>
          </View>

          <View style={styles.divider} />

          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 22 }}
          >
            {[
              "Today",
              "Week",
              "Month",
              "Year",
              "Custom",
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,

                  item === "Week" &&
                    styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,

                    item === "Week" &&
                      styles.activeFilterText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* STATS */}
          <View style={styles.statsContainer}>
            {[
              [
                "Revenue",
                "₹84,200",
                "+12.4% vs prev",
              ],

              [
                "Invoices",
                "58",
                "+8 vs prev",
              ],

              [
                "Avg ticket",
                "₹1,452",
                "+3.1% vs prev",
              ],

              [
                "New customers",
                "14",
                "-2 vs prev",
              ],
            ].map((item, index) => (
              <View
                key={index}
                style={styles.statsCard}
              >
                <Text style={styles.statsLabel}>
                  {item[0]}
                </Text>

                <Text style={styles.statsValue}>
                  {item[1]}
                </Text>

                <Text style={styles.statsGrowth}>
                  {item[2]}
                </Text>
              </View>
            ))}
          </View>

          {/* REPORT OPTIONS */}
          <View style={styles.reportContainer}>
            {[
              [
                "trending-up-outline",
                "Sales report",
                "Revenue, taxes, totals",
                "#DFF3EA",
                "#146C43",
              ],

              [
                "people-outline",
                "Sales by staff",
                "Performance per team member",
                "#FFF4E5",
                "#8B5E3C",
              ],

              [
                "cube-outline",
                "Sales by items",
                "Top services & products",
                "#E8F7EE",
                "#16A34A",
              ],

              [
                "wallet-outline",
                "Profit & loss",
                "Income vs expenses",
                "#FEECEC",
                "#DC2626",
              ],
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.reportRow,

                  index !== 3 && {
                    borderBottomWidth: 1,
                    borderBottomColor:
                      "#E5E7EB",
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconCircle,

                    {
                      backgroundColor:
                        item[3] as string,
                    },
                  ]}
                >
                  <Ionicons
                    name={item[0] as any}
                    size={22}
                    color={item[4] as string}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.reportTitle}>
                    {item[1]}
                  </Text>

                  <Text style={styles.reportSub}>
                    {item[2]}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* FOOTER */}
        <Footer active="Reports" />
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

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  filterButton: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  filterText: {
    color: "#111827",
    fontWeight: "500",
    fontSize: 13,
  },

  activeFilterText: {
    color: "white",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statsCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },

  statsLabel: {
    color: "#6B7280",
    fontSize: 13,
  },

  statsValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 10,
  },

  statsGrowth: {
    color: "#16A34A",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
  },

  reportContainer: {
    backgroundColor: "white",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginTop: 8,
  },

  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  reportTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  reportSub: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 13,
  },
});