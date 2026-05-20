import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
          bounces={false}
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
            style={{ marginBottom: 20 }}
          >
            {["Today", "Week", "Month", "All time"].map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterButton,
                    item === "Today" &&
                      styles.activeFilter,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      item === "Today" &&
                        styles.activeFilterText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          {/* REVENUE CARD */}
          <View style={styles.revenueCard}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />

            <Text style={styles.revenueLabel}>
              Today's revenue
            </Text>

            <Text style={styles.revenueAmount}>
              ₹14,580
            </Text>

            <View style={styles.growthBadge}>
              <Ionicons
                name="trending-up"
                size={12}
                color="white"
              />

              <Text style={styles.growthText}>
                +30.2% vs yesterday
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  Invoices
                </Text>

                <Text style={styles.statValue}>
                  12
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  Bookings
                </Text>

                <Text style={styles.statValue}>
                  8
                </Text>
              </View>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[
                styles.actionCard,
                styles.activeActionCard,
              ]}
            >
              <View
                style={[
                  styles.actionIconCircle,
                  styles.activeIconCircle,
                ]}
              >
                <Ionicons
                  name="receipt-outline"
                  size={22}
                  color="white"
                />
              </View>

              <Text
                style={[
                  styles.actionText,
                  styles.activeActionText,
                ]}
              >
                New invoice
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
            >
              <View style={styles.actionIconCircle}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#146C43"
                />
              </View>

              <Text style={styles.actionText}>
                Booking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
            >
              <View style={styles.actionIconCircle}>
                <Ionicons
                  name="construct-outline"
                  size={22}
                  color="#146C43"
                />
              </View>

              <Text style={styles.actionText}>
                Job card
              </Text>
            </TouchableOpacity>
          </View>

          {/* CHART */}
          <View style={styles.chartCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>
                Revenue trend
              </Text>

              <Text style={styles.smallText}>
                Last 7 days
              </Text>
            </View>

            <LineChart
              data={{
                labels: [
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                ],
                datasets: [
                  {
                    data: [2, 4, 6, 5, 9, 13, 11],
                  },
                ],
              }}
              width={screenWidth - 64}
              height={180}
              withDots
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withShadow
              fromZero
              bezier
              chartConfig={{
                backgroundGradientFrom:
                  "#ffffff",
                backgroundGradientTo:
                  "#ffffff",

                decimalPlaces: 0,

                color: (opacity = 1) =>
                  `rgba(20,108,67,${opacity})`,

                labelColor: () =>
                  "#6B7280",

                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#146C43",
                },
              }}
              style={styles.chart}
            />
          </View>

          {/* PAYMENT + BOOKINGS */}
          <View style={styles.doubleRow}>
            {/* PAYMENT */}
            <View style={styles.smallCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>
                  Payments
                </Text>

                <Text style={styles.smallText}>
                  Mix
                </Text>
              </View>

              <View style={styles.donutWrapper}>
                <View style={styles.donutOuter}>
                  <View style={styles.donutInner}>
                    <Text style={styles.totalLabel}>
                      Total
                    </Text>

                    <Text style={styles.totalAmount}>
                      ₹84k
                    </Text>
                  </View>
                </View>
              </View>

              {[
                ["UPI", "52%"],
                ["Cash", "23%"],
                ["Card", "18%"],
                ["Bank", "7%"],
              ].map((item, index) => (
                <View
                  key={index}
                  style={styles.paymentRow}
                >
                  <View
                    style={styles.paymentLeft}
                  >
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            [
                              "#146C43",
                              "#F59E0B",
                              "#14B8A6",
                              "#3B82F6",
                            ][index],
                        },
                      ]}
                    />

                    <Text
                      style={styles.paymentText}
                    >
                      {item[0]}
                    </Text>
                  </View>

                  <Text
                    style={styles.paymentValue}
                  >
                    {item[1]}
                  </Text>
                </View>
              ))}
            </View>

            {/* BOOKINGS */}
            <View style={styles.smallCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>
                  Bookings
                </Text>

                <Text style={styles.smallText}>
                  Last 7 days
                </Text>
              </View>

              <View style={styles.bookingGraph}>
                {[
                  20, 40, 35, 60, 50, 70,
                  55,
                ].map((height, index) => (
                  <View
                    key={index}
                    style={styles.barWrapper}
                  >
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                        },
                      ]}
                    />

                    <Text style={styles.barLabel}>
                      {
                        [
                          "M",
                          "T",
                          "W",
                          "T",
                          "F",
                          "S",
                          "S",
                        ][index]
                      }
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* SERVICES */}
          <View style={styles.servicesCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>
                Top services
              </Text>

              <Text style={styles.smallText}>
                This week
              </Text>
            </View>

            {[
              [
                "Premium Wash",
                "18 jobs · ₹14.4k",
                "100%",
              ],

              [
                "Interior Detail",
                "12 jobs · ₹7.8k",
                "65%",
              ],

              [
                "Oil Change",
                "9 jobs · ₹4.5k",
                "48%",
              ],

              [
                "Wax Polish",
                "7 jobs · ₹2.8k",
                "38%",
              ],
            ].map((item, index) => (
              <View
                key={index}
                style={styles.serviceItem}
              >
                <View style={styles.rowBetween}>
                  <Text style={styles.serviceName}>
                    {item[0]}
                  </Text>

                  <Text style={styles.serviceValue}>
                    {item[1]}
                  </Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width:
                          item[2] as any,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* HOURLY TRAFFIC */}
          <View style={styles.trafficCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>
                Hourly traffic
              </Text>

              <Text style={styles.smallText}>
                Today
              </Text>
            </View>

            <View style={styles.hourRow}>
              {[
                "9",
                "10",
                "11",
                "12",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
              ].map((hour, index) => (
                <Text
                  key={index}
                  style={styles.hourText}
                >
                  {hour}
                </Text>
              ))}
            </View>

            <Text style={styles.peakText}>
              Peak hour: 3 PM (5 jobs)
            </Text>
          </View>

          {/* RECENT INVOICES */}
          <View style={styles.invoiceSection}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>
                Recent invoices
              </Text>

              <Text style={styles.viewAll}>
                View all
              </Text>
            </View>

            {[
              [
                "RS",
                "Rahul Sharma",
                "INV-2041 · Today, 14:32",
                "₹1,798",
                "Paid",
              ],

              [
                "PP",
                "Priya Patel",
                "INV-2040 · Today, 13:15",
                "₹499",
                "Paid",
              ],

              [
                "AM",
                "Arjun Mehta",
                "INV-2039 · Today, 11:48",
                "₹2,999",
                "Draft",
              ],
            ].map((item, index) => (
              <View
                key={index}
                style={styles.invoiceCard}
              >
                <View style={styles.invoiceLeft}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item[0]}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={styles.customerName}
                    >
                      {item[1]}
                    </Text>

                    <Text
                      style={styles.invoiceInfo}
                    >
                      {item[2]}
                    </Text>
                  </View>
                </View>

                <View style={styles.invoiceRight}>
                  <Text
                    style={styles.invoiceAmount}
                  >
                    {item[3]}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          item[4] === "Paid"
                            ? "#E8F7EE"
                            : "#F3F4F6",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            item[4] === "Paid"
                              ? "#22C55E"
                              : "#9CA3AF",
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            item[4] === "Paid"
                              ? "#16A34A"
                              : "#6B7280",
                        },
                      ]}
                    >
                      {item[4]}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 90 }} />
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
    paddingHorizontal: 14,
    paddingTop: 6,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  shopName: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2F0",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    fontSize: 18,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },

  filterButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  activeFilterText: {
    color: "white",
  },

  revenueCard: {
    backgroundColor: "#146C43",
    borderRadius: 30,
    padding: 18,
    overflow: "hidden",
    marginBottom: 20,
  },

  circle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor:
      "rgba(255,255,255,0.08)",
    top: -20,
    right: -50,
  },

  circle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor:
      "rgba(255,255,255,0.06)",
    bottom: -20,
    right: -10,
  },

  revenueLabel: {
    color: "#D1FAE5",
    fontSize: 14,
  },

  revenueAmount: {
    color: "white",
    fontSize: 44,
    fontWeight: "bold",
    marginTop: 8,
  },

  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor:
      "rgba(255,255,255,0.14)",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },

  growthText: {
    color: "white",
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  statCard: {
    width: "47%",
    backgroundColor:
      "rgba(255,255,255,0.14)",
    borderRadius: 22,
    padding: 16,
  },

  statLabel: {
    color: "#D1FAE5",
    fontSize: 14,
  },

  statValue: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 6,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  actionCard: {
    width: "31%",
    backgroundColor: "white",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 16,
    alignItems: "center",
  },

  activeActionCard: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  actionIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  activeIconCircle: {
    backgroundColor:
      "rgba(255,255,255,0.14)",
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  activeActionText: {
    color: "white",
  },

  chartCard: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    marginBottom: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  smallText: {
    fontSize: 13,
    color: "#6B7280",
  },

  chart: {
    marginTop: 12,
    borderRadius: 18,
    marginLeft: -12,
  },

  doubleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  smallCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },

  donutWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },

  donutOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 14,
    borderColor: "#146C43",
    justifyContent: "center",
    alignItems: "center",
  },

  donutInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  paymentText: {
    fontSize: 13,
    color: "#374151",
  },

  paymentValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  bookingGraph: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 140,
    marginTop: 18,
  },

  barWrapper: {
    alignItems: "center",
  },

  bar: {
    width: 10,
    borderRadius: 10,
    backgroundColor: "#146C43",
    marginBottom: 8,
  },

  barLabel: {
    fontSize: 10,
    color: "#6B7280",
  },

  servicesCard: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    marginBottom: 20,
  },

  serviceItem: {
    marginTop: 18,
  },

  serviceName: {
    fontSize: 14,
    fontWeight: "600",
  },

  serviceValue: {
    fontSize: 13,
    color: "#374151",
  },

  progressBg: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginTop: 8,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#146C43",
    borderRadius: 8,
  },

  trafficCard: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    marginBottom: 20,
  },

  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
  },

  hourText: {
    fontSize: 11,
    color: "#6B7280",
  },

  peakText: {
    marginTop: 14,
    fontSize: 14,
    color: "#374151",
  },

  invoiceSection: {
    marginBottom: 10,
  },

  viewAll: {
    color: "#146C43",
    fontWeight: "600",
    fontSize: 14,
  },

  invoiceCard: {
    backgroundColor: "white",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  invoiceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#146C43",
    fontWeight: "700",
    fontSize: 15,
  },

  customerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  invoiceInfo: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
  },

  invoiceRight: {
    alignItems: "flex-end",
  },

  invoiceAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginTop: 8,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});