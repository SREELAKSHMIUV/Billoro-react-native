import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { createInvoice } from "../services/invoiceApi";

import Footer from "../components/Footer";

export default function InvoiceReview() {

  const {
    invoiceNo,
    phone,
    vehicle,
    name,
    date,
    items,
    total,
  } = useLocalSearchParams();

  const [loading, setLoading] =
    useState(false);

  const parsedItems = items
    ? JSON.parse(items as string)
    : [];

  const subtotal = Number(total);

  const cgst = subtotal * 0.09;

  const sgst = subtotal * 0.09;

  const grandTotal =
    subtotal + cgst + sgst;

  /* CREATE INVOICE */
  const handleCreateInvoice =
    async () => {

      try {

        setLoading(true);

        const invoicePayload = {

          invoice_number:
            invoiceNo,

          issue_date:
            new Date(
              date as string
            )
              .toISOString()
              .split("T")[0],

          currency: "INR",

          customer: {
            name: name,

            phone_e164:
              `+91${phone}`,

            selected_vehicle_numbers: [
              {
                vehicle_number:
                  vehicle,
              },
            ],
          },

          items: parsedItems.map(
              (item: any) => ({

                item_type: "service",

                description:
                  item.title,

                qty: item.qty,

                unit_price:
                  item.price,

                line_total:
                  item.price *
                  item.qty,

                tax_rate: 5,

                disc_rate: 0,

              })
            ),

          totals: {
            taxable_amount_total:
              subtotal,

            tax_total:
              cgst + sgst,

            cgst_total:
              cgst,

            sgst_total:
              sgst,

            final_total:
              grandTotal,
          },
        };

        const response =
          await createInvoice(
            invoicePayload
          );
        console.log(
          "FULL CREATE RESPONSE:",
          JSON.stringify(response, null, 2)
        );

        console.log(
          "INVOICE ID:",
          response?.invoice_id
        );
        console.log(
          "CREATE RESPONSE:",
          response
        );
        console.log(
          "PASSING INVOICE ID:",
          response?.invoice_id
        );
        router.replace({
          pathname: "/payment",
          params: {
            invoiceId:
              response.data.invoice_id,

            invoiceNo,

            customerName: name,

            total:
              grandTotal.toString(),
          },
        });

      } catch (error: any) {

        console.log(
          "CREATE INVOICE ERROR:",
          error
        );

        console.log(
          "FULL ERROR:",
          JSON.stringify(
            error.response?.data,
            null,
            2
          )
        );

        Alert.alert(
          "Error",
          "Failed to create invoice"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >

        <View style={styles.card}>

          <Text style={styles.heading}>
            Invoice
          </Text>

          {/* SHOP */}
          <View style={styles.shopBox}>

            <Text style={styles.shopName}>
              Billoro
            </Text>

            <Text style={styles.shopText}>
              Kanhangad, Kerala
            </Text>

            <Text style={styles.shopText}>
              Phone: +91 9876543211
            </Text>

            <Text style={styles.shopText}>
              GSTIN: 122131232
            </Text>

          </View>

          {/* CUSTOMER */}
          <View style={styles.customerSection}>

            {/* Row 1 */}
            <View style={styles.infoRow}>

              <View style={styles.infoBlock}>
                <Text style={styles.label}>
                  Invoice No
                </Text>

                <Text style={styles.value}>
                  {invoiceNo}
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.label}>
                  Vehicle
                </Text>

                <Text style={styles.value}>
                  {vehicle}
                </Text>
              </View>

            </View>

            {/* Row 2 */}
            <View style={styles.infoRow}>

              <View style={styles.infoBlock}>
                <Text style={styles.label}>
                  Customer
                </Text>

                <Text style={styles.value}>
                  {name}
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.label}>
                  Mobile
                </Text>

                <Text style={styles.value}>
                  {phone}
                </Text>
              </View>

            </View>

            {/* Row 3 */}
            <View style={styles.infoRow}>

              <View style={styles.infoBlock}>
                <Text style={styles.label}>
                  Date
                </Text>

                <Text style={styles.value}>
                  {new Date(
                    date as string
                  ).toLocaleDateString()}
                </Text>
              </View>

            </View>

          </View>

          {/* TABLE HEADER */}
          <View style={styles.tableHeader}>

            <Text style={styles.col1}>
              Item
            </Text>

            <Text style={styles.col2}>
              Qty
            </Text>

            <Text style={styles.col3}>
              Amt
            </Text>

          </View>

          {/* ITEMS */}
          {parsedItems.map(
            (item: any) => (

              <View
                key={item.id}
                style={styles.tableRow}
              >

                <Text style={styles.col1}>
                  {item.title}
                </Text>

                <Text style={styles.col2}>
                  {item.qty}
                </Text>

                <Text style={styles.col3}>
                  ₹
                  {(
                    item.price *
                    item.qty
                  ).toFixed(2)}
                </Text>

              </View>
            )
          )}

          {/* TOTALS */}
          <View style={styles.totalSection}>

            <View style={styles.totalRow}>

              <Text
                style={styles.totalLabel}
              >
                Taxable Amount
              </Text>

              <Text
                style={styles.totalValue}
              >
                ₹
                {subtotal.toFixed(2)}
              </Text>

            </View>

            <View style={styles.totalRow}>

              <Text
                style={styles.totalLabel}
              >
                CGST
              </Text>

              <Text
                style={styles.totalValue}
              >
                ₹
                {cgst.toFixed(2)}
              </Text>

            </View>

            <View style={styles.totalRow}>

              <Text
                style={styles.totalLabel}
              >
                SGST
              </Text>

              <Text
                style={styles.totalValue}
              >
                ₹
                {sgst.toFixed(2)}
              </Text>

            </View>

          </View>

          {/* FINAL TOTAL */}
          <View style={styles.finalRow}>

            <Text style={styles.finalText}>
              Total
            </Text>

            <Text style={styles.finalAmount}>
              ₹
              {grandTotal.toFixed(2)}
            </Text>

          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() =>
                router.back()
              }
            >

              <Text style={styles.backText}>
                ← Back
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createBtn}
              onPress={
                handleCreateInvoice
              }
              disabled={loading}
            >

              <Text
                style={styles.createText}
              >
                {loading
                  ? "Creating..."
                  : "Create invoice"}
              </Text>

            </TouchableOpacity>

          </View>

        </View>

        <View style={{ height: 30 }} />

      </ScrollView>

      <Footer active="Invoices" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  shopBox: {
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  shopName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },

  shopText: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 4,
  },

  customerSection: {
    marginVertical: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  infoBlock: {
    flex: 1,
  },

  label: {
    color: "#6B7280",
    marginBottom: 2,
    fontSize: 11,
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 0,
  },

  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  col1: {
    flex: 2,
    fontSize: 13,
    color: "#111827",
  },

  col2: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    color: "#111827",
  },

  col3: {
    flex: 1,
    textAlign: "right",
    fontWeight: "700",
    fontSize: 13,
    color: "#111827",
  },

  totalSection: {
    marginTop: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  totalLabel: {
    color: "#6B7280",
    fontSize: 13,
  },

  totalValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  finalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 12,
  },

  finalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  finalAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#146C43",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  backBtn: {
    width: "30%",
    height: 54,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  createBtn: {
    width: "66%",
    height: 54,
    backgroundColor: "#146C43",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  createText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },

});