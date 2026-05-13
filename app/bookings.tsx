import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Footer from "../components/Footer";

export default function BookingsScreen() {
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
              <Text style={styles.heading}>
                Bookings
              </Text>

              <Text style={styles.subHeading}>
                4 scheduled
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

          {/* DATE SELECTOR */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 18 }}
          >
            {[
              ["MON", "11"],
              ["TUE", "12"],
              ["WED", "13"],
              ["THU", "14"],
              ["FRI", "15"],
              ["SAT", "16"],
              ["SUN", "17"],
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  item[0] === "WED" &&
                    styles.activeDateCard,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    item[0] === "WED" && {
                      color: "white",
                    },
                  ]}
                >
                  {item[0]}
                </Text>

                <Text
                  style={[
                    styles.dateText,
                    item[0] === "WED" && {
                      color: "white",
                    },
                  ]}
                >
                  {item[1]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color="#6B7280"
            />

            <TextInput
              placeholder="Search booking"
              placeholderTextColor="#6B7280"
              style={styles.searchInput}
            />
          </View>

          {/* BOOKINGS */}
          {[
            {
              time: "10",
              minute: "00",
              name: "Rahul Sharma",
              service: "Premium Wash · Amit",
              status: "Confirmed",
            },

            {
              time: "11",
              minute: "30",
              name: "Priya Patel",
              service: "Interior Detail · Ravi",
              status: "Confirmed",
            },

            {
              time: "14",
              minute: "00",
              name: "Arjun Mehta",
              service: "Oil Change · Suresh",
              status: "Pending",
            },

            {
              time: "16",
              minute: "00",
              name: "Sneha Iyer",
              service: "Wax Polish · Amit",
              status: "Done",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={styles.bookingCard}
            >
              {/* TIME */}
              <View style={styles.timeSection}>
                <Text style={styles.timeHour}>
                  {item.time}
                </Text>

                <Text style={styles.timeMinute}>
                  {item.minute}
                </Text>
              </View>

              {/* CONTENT */}
              <View style={styles.contentSection}>
                {/* TOP */}
                <View style={styles.topRow}>
                  <Text
                    numberOfLines={1}
                    style={styles.customerName}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,

                      item.status === "Pending" && {
                        backgroundColor: "#E5E7EB",
                      },

                      item.status === "Done" && {
                        backgroundColor: "#DBEAFE",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,

                        item.status === "Pending" && {
                          backgroundColor: "#6B7280",
                        },

                        item.status === "Done" && {
                          backgroundColor: "#2563EB",
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.statusText,

                        item.status === "Pending" && {
                          color: "#4B5563",
                        },

                        item.status === "Done" && {
                          color: "#2563EB",
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.serviceText}>
                  {item.service}
                </Text>

                {/* ACTIONS */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.smallButton}
                  >
                    <Ionicons
                      name="call-outline"
                      size={14}
                      color="#111827"
                    />

                    <Text style={styles.smallButtonText}>
                      Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.smallButton}
                  >
                    <Ionicons
                      name="logo-whatsapp"
                      size={14}
                      color="#16A34A"
                    />

                    <Text
                      style={[
                        styles.smallButtonText,
                        { color: "#16A34A" },
                      ]}
                    >
                      WhatsApp
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.invoiceButton}
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={14}
                      color="white"
                    />

                    <Text
                      style={styles.invoiceButtonText}
                    >
                      Invoice
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* FOOTER */}
        <Footer active="Bookings" />
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  subHeading: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
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

  dateCard: {
    width: 60,
    height: 76,
    borderRadius: 22,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  activeDateCard: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  dayText: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "600",
  },

  dateText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 2,
    color: "#111827",
  },

  searchContainer: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  bookingCard: {
    backgroundColor: "white",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
  },

  timeSection: {
    width: 50,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    paddingRight: 10,
  },

  timeHour: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  timeMinute: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: -2,
  },

  contentSection: {
    flex: 1,
    marginLeft: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },

  serviceText: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F3EA",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 4,
  },

  statusText: {
    color: "#146C43",
    fontSize: 10,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "space-between",
  },

  smallButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2F1",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },

  smallButtonText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "600",
    color: "#111827",
  },

  invoiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#146C43",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },

  invoiceButtonText: {
    color: "white",
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "600",
  },
});