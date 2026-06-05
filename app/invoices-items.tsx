import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Footer from "../components/Footer";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

export default function ItemsScreen() {
  const params = useLocalSearchParams();

  const invoiceNo =
    params.invoiceNo as string;

  const phone =
    params.phone as string;

  const vehicle =
    params.vehicle as string;

  const name =
    params.name as string;

  const date =
    params.date as string;

  const services = [
    {
      id: 1,
      title: "2 Wheeler Labour Cost",
      price: 1200,
    },

    {
      id: 2,
      title: "Care",
      price: 280,
    },

    {
      id: 3,
      title: "Diesel Wash",
      price: 1000,
    },
  ];

  const [lineItems, setLineItems] =
    useState<any[]>([]);

  /* ADD SERVICE */
  const addService = (service: any) => {
    const exists = lineItems.find(
      (item) => item.id === service.id
    );

    if (exists) {
      const updated = lineItems.map(
        (item) =>
          item.id === service.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
      );

      setLineItems(updated);
    } else {
      setLineItems([
        ...lineItems,
        {
          ...service,
          qty: 1,
        },
      ]);
    }
  };

  /* INCREASE QTY */
  const increaseQty = (id: number) => {
    const updated = lineItems.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
    );

    setLineItems(updated);
  };

  /* DECREASE QTY */
  const decreaseQty = (id: number) => {
    const updated = lineItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
      .filter((item) => item.qty > 0);

    setLineItems(updated);
  };

  /* DELETE ITEM */
  const deleteItem = (id: number) => {
    const updated = lineItems.filter(
      (item) => item.id !== id
    );

    setLineItems(updated);
  };

  /* TOTAL */
  const total = lineItems.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
          paddingBottom: 120,
          }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#111827"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Invoice
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* STEPPER */}
        <View style={styles.stepContainer}>
          <View style={styles.stepItem}>
            <View style={styles.doneDot}>
              <Text style={styles.tick}>
                ✓
              </Text>
            </View>

            <Text style={styles.doneText}>
              Customer
            </Text>
          </View>

          <View style={styles.activeLine} />

          <View style={styles.stepItem}>
            <View style={styles.activeDot} />

            <Text style={styles.activeText}>
              Items
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.stepItem}>
            <View
              style={styles.inactiveDot}
            />

            <Text
              style={styles.inactiveText}
            >
              Review
            </Text>
          </View>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Invoice
          </Text>

          {/* TABS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            style={{ marginBottom: 18 }}
          >
            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.activeTab}
              >
                <Text
                  style={
                    styles.activeTabText
                  }
                >
                  Services
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
              >
                <Text style={styles.tabText}>
                  Products
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
              >
                <Text style={styles.tabText}>
                  Packages
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
              >
                <Text style={styles.tabText}>
                  Discount
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* SEARCH */}
          <Text style={styles.label}>
            Search service
          </Text>

          <View style={styles.searchBox}>
            <TextInput
              placeholder="Haircut, facial..."
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          {/* SERVICES */}
          <View style={styles.serviceContainer}>
            {services.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.serviceBox}
                onPress={() =>
                  addService(item)
                }
              >
                <Text
                  style={
                    styles.serviceTitle
                  }
                >
                  {item.title}
                </Text>

                <Text style={styles.price}>
                  ₹
                  {item.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* LINE ITEMS */}
          <View style={styles.lineHeader}>
            <Text
              style={styles.sectionTitle}
            >
              Line items
            </Text>

            <Text style={styles.itemCount}>
              {lineItems.length} item(s)
            </Text>
          </View>

          {lineItems.length === 0 ? (
            <Text style={styles.emptyText}>
              No items added yet
            </Text>
          ) : (
            lineItems.map((item) => (
              <View
                key={item.id}
                style={styles.lineItem}
              >
                <View
                  style={
                    styles.lineTopRow
                  }
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={
                        styles.serviceTitle
                      }
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={styles.price}
                    >
                      ₹
                      {item.price.toFixed(
                        2
                      )}
                    </Text>

                    <View
                      style={
                        styles.staffRow
                      }
                    >
                      <Ionicons
                        name="person-circle-outline"
                        size={18}
                        color="#6B7280"
                      />

                      <Text
                        style={
                          styles.staffText
                        }
                      >
                        Assign staff
                        (optional)
                      </Text>
                    </View>
                  </View>

                  {/* QTY */}
                  <View
                    style={styles.qtyBox}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        decreaseQty(
                          item.id
                        )
                      }
                    >
                      <Ionicons
                        name="remove"
                        size={20}
                        color="#111827"
                      />
                    </TouchableOpacity>

                    <Text
                      style={
                        styles.qtyText
                      }
                    >
                      {item.qty}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        increaseQty(
                          item.id
                        )
                      }
                    >
                      <Ionicons
                        name="add"
                        size={20}
                        color="#111827"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* DELETE */}
                  <TouchableOpacity
                    onPress={() =>
                      deleteItem(item.id)
                    }
                  >
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* TOTAL */}
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              ₹{total.toFixed(2)}
            </Text>
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>
                ← Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                router.replace({
                  pathname:
                    "/invoice-review",

                  params: {
                    invoiceNo,
                    phone,
                    vehicle,
                    name,
                    date,

                    items:
                      JSON.stringify(
                        lineItems
                      ),

                    total:
                      total.toString(),
                  },
                });
              }}
            >
              <Text style={styles.nextText}>
                Next →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 10 }} />
      </ScrollView>
      <Footer active="Invoices" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "white",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  /* STEPPER */

  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 14,
  },

  stepItem: {
    alignItems: "center",
  },

  doneDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#146C43",
    justifyContent: "center",
    alignItems: "center",
  },

  tick: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#146C43",
  },

  inactiveDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D1D5DB",
  },

  activeLine: {
    width: 55,
    height: 2,
    backgroundColor: "#146C43",
    marginHorizontal: 6,
  },

  line: {
    width: 55,
    height: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 6,
  },

  doneText: {
    fontSize: 12,
    marginTop: 6,
    color: "#146C43",
    fontWeight: "600",
  },

  activeText: {
    fontSize: 12,
    marginTop: 6,
    color: "#146C43",
    fontWeight: "600",
  },

  inactiveText: {
    fontSize: 12,
    marginTop: 6,
    color: "#9CA3AF",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  tabs: {
    flexDirection: "row",
  },

  activeTab: {
    backgroundColor: "#146C43",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 22,
    marginRight: 10,
  },

  activeTabText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },

  tab: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: "white",
  },

  tabText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "600",
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "600",
  },

  searchBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  input: {
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
  },

  serviceContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 22,
    padding: 10,
    marginBottom: 22,
  },

  serviceBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },

  serviceTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  price: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B7280",
  },

  lineHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  itemCount: {
    fontSize: 14,
    color: "#6B7280",
  },

  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginBottom: 20,
  },

  lineItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 18,
    marginBottom: 18,
  },

  lineTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  staffText: {
    marginLeft: 6,
    color: "#6B7280",
    fontSize: 13,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 14,
  },

  qtyText: {
    marginHorizontal: 18,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#146C43",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
  },

  backBtn: {
    width: "30%",
    height: 54,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  nextBtn: {
    width: "66%",
    height: 54,
    backgroundColor: "#146C43",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  nextText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});