import React, {
  useEffect,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import {
  getInvoices,
  deleteInvoice,
} from "../services/invoiceApi";
import Footer from "../components/Footer";

export default function InvoiceScreen() {
  const [invoices, setInvoices] =
  useState<any[]>([]);

    const [loading, setLoading] =
      useState(true);

    const [search, setSearch] =
      useState("");
    const loadInvoices = async () => {

      try {

        setLoading(true);

        const response =
          await getInvoices(
            1,
            50,
            search
          );

        console.log(
          "INVOICE LIST:",
          JSON.stringify(
            response,
            null,
            2
          )
        );

        setInvoices(response.items || []);

      } catch (error) {

        console.log(
          "LIST INVOICE ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    };
    const handleDeleteInvoice =
  async (invoiceId: string) => {

    try {

      const response =
        await deleteInvoice(
          invoiceId
        );
        await loadInvoices();
      console.log(
        "DELETE RESPONSE:",
        JSON.stringify(
          response,
          null,
          2
        )
      );

      Alert.alert(
        "Success",
        "Invoice deleted successfully"
      );

      loadInvoices();

    } catch (error: any) {

      console.log(
        "DELETE ERROR:",
        JSON.stringify(
          error?.response?.data ||
            error,
          null,
          2
        )
      );

      Alert.alert(
        "Error",
        "Failed to delete invoice"
      );

    }
};
    useEffect(() => {loadInvoices();}, []);
    useFocusEffect(
      React.useCallback(() => {

      console.log(
        "Invoice screen focused"
      );

      loadInvoices();

    }, [])
);
    useEffect(() => {

      const timer =
        setTimeout(() => {

          loadInvoices();

        }, 500);

      return () =>
        clearTimeout(timer);

    }, [search]);
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
                Invoices
              </Text>

              <Text style={styles.subHeading}>
                {invoices.length} invoices
              </Text>
            </View>

            {/* NEW BUTTON */}
            <TouchableOpacity
              style={styles.newButton}
              onPress={() =>
                router.push("/invoice-create" as any)
              }
            >
              <Ionicons
                name="add"
                size={18}
                color="white"
              />

              <Text style={styles.newButtonText}>
                New
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#6B7280"
            />

            <TextInput
              placeholder="Search invoice or customer"
              placeholderTextColor="#6B7280"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
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

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>
                All
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* COLLECTION CARD */}
          <View style={styles.collectionCard}>
            <View>
              <Text style={styles.collectionLabel}>
                Today's collection
              </Text>

              <Text style={styles.collectionAmount}>
                ₹3,895
              </Text>
            </View>

            <View>
              <Text style={styles.collectionLabel}>
                Pending
              </Text>

              <Text style={styles.collectionAmount}>
                ₹4,598
              </Text>
            </View>
          </View>

          {/* INVOICE LIST */}
              {invoices.map((item, index) => (

  <View
    key={item.id || index}
    style={styles.invoiceCard}
  >

    <View style={styles.invoiceTop}>

      <View style={styles.avatar}>

        <Text style={styles.avatarText}>
          {
            item.invoice_number
              ?.substring(0, 2)
              ?.toUpperCase() || "IN"
          }
        </Text>

      </View>

      <View style={{ flex: 1 }}>

        <Text style={styles.customerName}>
          {item.customer_phone}
        </Text>

        <Text style={styles.invoiceDetails}>
          {item.invoice_number}
        </Text>

        <Text style={styles.invoiceTime}>
          {item.invoice_date}
        </Text>

      </View>

      <View style={{ alignItems: "flex-end" }}>

        <Text style={styles.invoiceAmount}>
          ₹{item.total_amount}
        </Text>

        <View style={styles.paidBadge}>

          <View style={styles.greenDot} />

          <Text
            style={[
              styles.paidText,
              {
                color:
                  item.status === "voided"
                    ? "#DC2626"
                    : "#16A34A",
              },
            ]}
          >
            {
              item.status === "voided"
                ? "DELETED"
                : item.status.toUpperCase()
            }
          </Text>
        </View>

      </View>

    </View>

    <View style={styles.cardDivider} />

    <View style={styles.actionRow}>

      <TouchableOpacity
        style={styles.actionButton}
      >
        <Ionicons
          name="eye-outline"
          size={18}
          color="#111827"
        />

        <Text style={styles.actionText}>
          View
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
      >
        <Ionicons
          name="share-social-outline"
          size={18}
          color="#111827"
        />

        <Text style={styles.actionText}>
          Share
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.actionButton}
  disabled={
    item.status === "voided"
  }
  onPress={() => {

    Alert.alert(
      "Delete Invoice",
      "Are you sure you want to delete this invoice?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: () =>
            handleDeleteInvoice(
              item.id
            ),
        },
      ]
    );

  }}
>
        <Ionicons
          name="trash-outline"
          size={18}
          color={
            item.status === "voided"
              ? "#9CA3AF"
              : "red"
          }
        />

        <Text
          style={[
            styles.actionText,
            {
              color:
                item.status === "voided"
                  ? "#9CA3AF"
                  : "red",
            },
          ]}
        >
          {item.status === "voided"
            ? "Deleted"
            : "Delete"}
        </Text>

      </TouchableOpacity>

    </View>

  </View>

))}

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* FOOTER */}
        <Footer active="Invoices" />
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
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },

  newButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  searchContainer: {
    height: 52,
    backgroundColor: "white",
    borderRadius: 26,
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

  activeFilter: {
    backgroundColor: "#146C43",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
  },

  activeFilterText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
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
    fontWeight: "500",
    fontSize: 13,
  },

  collectionCard: {
    backgroundColor: "#DFF3EA",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  collectionLabel: {
    color: "#146C43",
    fontSize: 13,
  },

  collectionAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#146C43",
    marginTop: 4,
  },

  invoiceCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  invoiceTop: {
    flexDirection: "row",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DFF3EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#146C43",
    fontWeight: "bold",
    fontSize: 16,
  },

  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  invoiceDetails: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
  },

  invoiceTime: {
    color: "#6B7280",
    marginTop: 6,
    fontSize: 12,
  },

  invoiceAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  paidBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F3EA",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    marginTop: 8,
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 4,
  },

  paidText: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 11,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  actionButton: {
    alignItems: "center",
  },

  actionText: {
    marginTop: 4,
    fontWeight: "500",
    color: "#111827",
    fontSize: 12,
  },
});