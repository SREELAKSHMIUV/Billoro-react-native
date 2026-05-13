import React from "react";

import {
  View,
  Text,
 StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { LineChart } from "react-native-chart-kit";

import Footer from "../components/Footer";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>
                Hi, Sreelakshmi 👋
              </Text>

              <Text style={styles.shopName}>
                Sunshine Auto Care
              </Text>
            </View>

            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>
                S
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 18 }}
          >
            <TouchableOpacity style={styles.activeFilter}>
              <Text style={styles.activeFilterText}>
                Today
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>
                Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>
                Month
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* REVENUE CARD */}
          <View style={styles.revenueCard}>
            <Text style={styles.revenueLabel}>
              Today's revenue
            </Text>

            <Text style={styles.revenueAmount}>
              ₹14,580
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                +30.2%
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statsBox}>
                <Text style={styles.statsLabel}>
                  Invoices
                </Text>

                <Text style={styles.statsValue}>
                  12
                </Text>
              </View>

              <View style={styles.statsBox}>
                <Text style={styles.statsLabel}>
                  Bookings
                </Text>

                <Text style={styles.statsValue}>
                  8
                </Text>
              </View>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.actionCard,
                styles.activeCard,
              ]}
            >
              <Ionicons
                name="receipt-outline"
                size={20}
                color="white"
              />

              <Text style={styles.activeCardText}>
                Invoice
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#146C43"
              />

              <Text style={styles.cardText}>
                Booking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Ionicons
                name="construct-outline"
                size={20}
                color="#146C43"
              />

              <Text style={styles.cardText}>
                Job Card
              </Text>
            </TouchableOpacity>
          </View>

          {/* CHART */}
          <View style={styles.chartCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>
                Revenue trend
              </Text>

              <Text style={styles.smallText}>
                Last 7 days
              </Text>
            </View>

            <LineChart
              data={{
                labels: [
                  "M",
                  "T",
                  "W",
                  "T",
                  "F",
                  "S",
                  "S",
                ],

                datasets: [
                  {
                    data: [2, 5, 8, 6, 12, 9, 14],
                  },
                ],
              }}
              width={screenWidth - 60}
              height={200}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",

                decimalPlaces: 0,

                color: () => "#146C43",

                labelColor: () => "#6B7280",

                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#146C43",
                },
              }}
              bezier
              style={{
                marginTop: 14,
                borderRadius: 16,
              }}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
            />
          </View>

          {/* SERVICES */}
          <View style={styles.chartCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>
                Top services
              </Text>

              <Text style={styles.smallText}>
                This week
              </Text>
            </View>

            {[
              ["Premium Wash", "90%"],
              ["Interior Detail", "70%"],
              ["Oil Change", "45%"],
            ].map((item, index) => (
              <View
                key={index}
                style={{ marginTop: 18 }}
              >
                <View style={styles.rowBetween}>
                  <Text style={styles.serviceText}>
                    {item[0]}
                  </Text>

                  <Text style={styles.serviceText}>
                    {item[1]}
                  </Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width:
                          item[1] as any,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* RECENT INVOICES */}
          <View style={styles.chartCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>
                Recent invoices
              </Text>

              <Text style={styles.smallText}>
                View all
              </Text>
            </View>

            {[
              ["RS", "Rahul Sharma", "₹1798"],
              ["PP", "Priya Patel", "₹499"],
              ["AM", "Arjun Mehta", "₹2999"],
            ].map((item, index) => (
              <View
                key={index}
                style={styles.invoiceRow}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item[0]}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.invoiceName}>
                    {item[1]}
                  </Text>

                  <Text style={styles.smallText}>
                    INV-2041
                  </Text>
                </View>

                <Text style={styles.amount}>
                  {item[2]}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        <Footer active="Home" />
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

  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  shopName: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
  },

  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  activeFilter: {
    backgroundColor: "#146C43",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
  },

  activeFilterText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },

  filterButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "500",
  },

  revenueCard: {
    backgroundColor: "#146C43",
    borderRadius: 26,
    padding: 20,
  },

  revenueLabel: {
    color: "#D1FAE5",
    fontSize: 14,
  },

  revenueAmount: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 8,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statsBox: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 16,
  },

  statsLabel: {
    color: "#D1FAE5",
    fontSize: 13,
  },

  statsValue: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  actionCard: {
    width: "31%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  activeCard: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  activeCardText: {
    color: "white",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  cardText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },

  chartCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  smallText: {
    color: "#6B7280",
    fontSize: 12,
  },

  serviceText: {
    fontSize: 13,
    fontWeight: "500",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 8,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#146C43",
    borderRadius: 10,
  },

  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DFF3EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#146C43",
    fontWeight: "bold",
    fontSize: 14,
  },

  invoiceName: {
    fontSize: 14,
    fontWeight: "600",
  },

  amount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});