import React, { useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,TextInput,Dimensions,} from "react-native";
import {SafeAreaView,} from "react-native-safe-area-context";
import {useLocalSearchParams,router,} from "expo-router";
import {Ionicons,MaterialIcons,FontAwesome5,} from "@expo/vector-icons";
import { finalizePayment } from "../services/paymentApi";
const { width, height } = Dimensions.get("window");
export default function Payment() 
{
  const {
    invoiceId,
    invoiceNo,
    customerName,
    total,
  } = useLocalSearchParams();
  console.log(
    "RECEIVED INVOICE ID:",
    invoiceId
  );
  const [paymentType,
    setPaymentType] =
    useState("full");

  const [paymentMethod,
    setPaymentMethod] =
    useState("cash");

  const [remarks,
    setRemarks] =
    useState("");
  const [partialAmount,
    setPartialAmount] =
    useState("");
  const [cashAmount,
    setCashAmount] =
    useState("");
  const [upiAmount,
    setUpiAmount] =
    useState("");
  const [showSuccessModal,
    setShowSuccessModal] =
    useState(false);

  const [paymentResult,
    setPaymentResult] =
    useState<any>(null);

  const handlePayment =
  async () => {

    try {

      if (
        paymentType === "partial"
      ) {

        const amount =
          Number(partialAmount);

        if (
          amount <= 0 ||
          amount >= Number(total)
        ) {

          alert(
            "Partial amount must be greater than 0 and less than total amount"
          );

          return;
        }
      }

      if (
        paymentType === "split"
      ) {

        const splitTotal =
          Number(cashAmount) +
          Number(upiAmount);

        if (
          splitTotal !==
          Number(total)
        ) {

          alert(
            "Split payment total must equal invoice total"
          );

          return;
        }
      }

      const paymentPayload = {

        payment_method:
          paymentMethod,

        paid_amount:

          paymentType === "partial"

            ? Number(partialAmount)

            : paymentType === "later"

            ? 0

            : Number(total),

        currency: "INR",

        provider_ref: "",

        remarks,

        is_partial_payment:
          paymentType === "partial",

        is_full_payment:
          paymentType === "full",

        is_pay_later:
          paymentType === "later",

        is_split_payment:
          paymentType === "split",

        split_payment_method:

          paymentType === "split"

            ? [
                {
                  paid_amount:
                    Number(cashAmount),

                  payment_method:
                    "cash",
                },

                {
                  paid_amount:
                    Number(upiAmount),

                  payment_method:
                    "upi",
                },
              ]

            : [],
      };

      console.log(
        "PAYMENT PAYLOAD:",
        JSON.stringify(
          paymentPayload,
          null,
          2
        )
      );

      const response =
        await finalizePayment(
          invoiceId as string,
          paymentPayload
        );
      setPaymentResult(response);
      setShowSuccessModal(true);
      console.log(
        "PAYMENT RESPONSE:",
        JSON.stringify(
          response,
          null,
          2
        )
      );

    } catch (error: any) {

      console.log(
        "PAYMENT ERROR:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
    {showSuccessModal && (

      <View style={styles.successOverlay}>

      <View style={styles.successModal}>

      <View style={styles.tickContainer}>
      <Text style={styles.tickMark}>✓</Text>
      </View>

      <Text style={styles.successTitle}>
      Payment Successful
      </Text>

      <Text style={styles.successSubtitle}>
        Invoice has been finalized successfully.
      </Text>

      <View style={styles.successInfo}>

      <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
      Amount Paid
      </Text>

      <Text style={styles.infoValue}>
      ₹{
        paymentResult?.data?.paid_amount
          ? Number(paymentResult.data.paid_amount).toFixed(2)
          : Number(total).toFixed(2)
      }
      </Text>
      </View>

      <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Amount Paid
  </Text>

  <Text style={styles.infoValue}>
    ₹{
      paymentResult?.data?.paid_amount
        ? Number(
            paymentResult.data.paid_amount
          ).toFixed(2)
        : Number(total).toFixed(2)
    }
  </Text>
</View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        Payment Mode
      </Text>

      <Text style={styles.infoValue}>
        {
          paymentResult?.data?.status === "full"
            ? "Full Payment"
            : paymentResult?.data?.status === "partial"
            ? "Partial Payment"
            : paymentResult?.data?.status === "split"
            ? "Split Payment"
            : paymentResult?.data?.status === "unpaid"
            ? "Pay Later"
            : "Payment Completed"
        }
      </Text>
    </View>

      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.replace("/invoices");
        }}
        >
          <Text style={styles.backButtonText}>
            Back to Invoices
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.whatsappButton}
      >

      <Text style={styles.whatsappButtonText}>
      Share on WhatsApp
      </Text>

      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => {

      setShowSuccessModal(false);

      router.replace("/invoice-create");

      }}
      >
      
      <Text style={styles.newInvoiceText}>
      Start New Invoice
      </Text>

      </TouchableOpacity>

      </View>

      </View>

      )}

      {!showSuccessModal && (

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >

            {/* HEADER */}
            <View style={styles.headerRow}>

              <Text style={styles.heading}>
                Finalize Payment
              </Text>

              <TouchableOpacity
                onPress={() => router.back()}
              >
                <Ionicons
                  name="close"
                  size={22}
                  color="#111827"
                />
              </TouchableOpacity>

            </View>

            {/* TOTAL */}
            <View style={styles.amountSection}>

              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalAmount}>
                ₹{Number(total).toFixed(2)}
              </Text>

            </View>

            {/* DETAILS */}
            <View style={styles.detailsContainer}>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Invoice #
                </Text>

                <Text style={styles.detailValue}>
                  {invoiceNo}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Customer
                </Text>

                <Text style={styles.detailValue}>
                  {customerName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Items
                </Text>

                <Text style={styles.detailValue}>
                  1
                </Text>
              </View>

            </View>
            {/* PAYMENT TYPE */}
            <Text style={styles.sectionTitle}>
              Payment Type
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 10,
              }}
              style={{
                marginBottom: 22,
              }}
            >

              {/* PAY LATER */}
              <TouchableOpacity
                style={[
                  styles.paymentTypeCard,
                  paymentType === "later" &&
                  styles.activeCard,
                ]}
                onPress={() =>
                  setPaymentType("later")
                }
              >

                <View style={styles.iconCircle}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color="#2F6B5F"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    Pay Later
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Collect later
                  </Text>
                </View>

              </TouchableOpacity>

              {/* FULL PAYMENT */}
              <TouchableOpacity
                style={[
                  styles.paymentTypeCard,
                  paymentType === "full" &&
                  styles.activeCard,
                ]}
                onPress={() =>
                  setPaymentType("full")
                }
              >

                <View style={styles.iconCircle}>
                  <Ionicons
                    name="cash-outline"
                    size={16}
                    color="#2F6B5F"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    Full Payment
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Collect full
                  </Text>
                </View>

              </TouchableOpacity>

              {/* SPLIT PAYMENT */}
              <TouchableOpacity
                style={[
                  styles.paymentTypeCard,
                  paymentType === "split" &&
                  styles.activeCard,
                ]}
                onPress={() =>
                  setPaymentType("split")
                }
              >

                <View style={styles.iconCircle}>
                  <Ionicons
                    name="swap-horizontal"
                    size={16}
                    color="#2F6B5F"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    Split Payment
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Multiple methods
                  </Text>
                </View>

              </TouchableOpacity>

              {/* PARTIAL PAYMENT */}
              <TouchableOpacity
                style={[
                  styles.paymentTypeCard,
                  paymentType === "partial" &&
                  styles.activeCard,
                ]}
                onPress={() =>
                  setPaymentType("partial")
                }
              >

                <View style={styles.iconCircle}>
                  <Ionicons
                    name="pie-chart-outline"
                    size={16}
                    color="#2F6B5F"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    Partial Payment
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Collect part now
                  </Text>
                </View>

              </TouchableOpacity>

            </ScrollView>
            {/* PARTIAL PAYMENT */}

            {paymentType === "partial" && (

            <View style={{ marginBottom: 20 }}>

              <Text style={styles.sectionTitle}>
                Partial Amount
              </Text>

              <TextInput
                value={partialAmount}
                onChangeText={setPartialAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                style={styles.amountInput}
              />

            </View>

            )}

            {/* SPLIT PAYMENT */}

            {paymentType === "split" && (

            <View style={{ marginBottom: 20 }}>

              <Text style={styles.sectionTitle}>
                Split Payment
              </Text>

              <TextInput
                value={cashAmount}
                onChangeText={setCashAmount}
                keyboardType="numeric"
                placeholder="Cash Amount"
                style={styles.amountInput}
              />

              <TextInput
                value={upiAmount}
                onChangeText={setUpiAmount}
                keyboardType="numeric"
                placeholder="UPI Amount"
                style={[
                  styles.amountInput,
                  { marginTop: 10 }
                ]}
              />

            </View> 

            )}
            {/* PAYMENT METHOD */}
            <Text style={styles.sectionTitle}>
              Payment Method
            </Text>

            <View style={styles.methodsGrid}>

              {/* CASH */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  paymentMethod === "cash" &&
                  styles.activeMethodCard,
                ]}
                onPress={() =>
                  setPaymentMethod("cash")
                }
              >

                <View style={styles.methodIcon}>
                  <FontAwesome5
                    name="money-bill-wave"
                    size={16}
                    color="#2F6B5F"
                  />
                </View>

                <Text style={styles.methodText}>
                  Cash
                </Text>

              </TouchableOpacity>

              {/* CARD */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  paymentMethod === "card" &&
                  styles.activeMethodCard,
                ]}
                onPress={() =>
                  setPaymentMethod("card")
                }
              >

                <View style={styles.methodIcon}>
                  <Ionicons
                    name="card-outline"
                    size={18}
                    color="#2F6B5F"
                  />
                </View>

                <Text style={styles.methodText}>
                  Card
                </Text>

              </TouchableOpacity>

              {/* UPI */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  paymentMethod === "upi" &&
                  styles.activeMethodCard,
                ]}
                onPress={() =>
                  setPaymentMethod("upi")
                }
              >

                <View style={styles.methodIcon}>
                  <MaterialIcons
                    name="qr-code"
                    size={18}
                    color="#2F6B5F"
                  />
                </View>

                <Text style={styles.methodText}>
                  UPI
                </Text>

              </TouchableOpacity>

              {/* BANK */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  paymentMethod === "bank" &&
                  styles.activeMethodCard,
                ]}
                onPress={() =>
                  setPaymentMethod("bank")
                }
              >

                <View style={styles.methodIcon}>
                  <Ionicons
                    name="business-outline"
                    size={18}
                    color="#2F6B5F"
                  />
                </View>

                <Text style={styles.methodText}>
                  Bank
                </Text>

              </TouchableOpacity>

            </View>

            {/* REMARKS */}
            <Text style={styles.sectionTitle}>
              Remarks
            </Text>

            <TextInput
              placeholder="Add a note..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={remarks}
              onChangeText={setRemarks}
              style={styles.remarksInput}
            />

            {/* BUTTON */}
            <TouchableOpacity
                style={styles.collectButton}
                onPress={handlePayment}
            >

              <Text style={styles.collectText}>
                Collect ₹
                {Number(total).toFixed(2)}
              </Text>

            </TouchableOpacity>

          </ScrollView>

        </View>

      </View>

    )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  backButton: {
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 14,
  },

  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D5A4C",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  modal: {
    width: "100%",
    maxHeight: height * 0.92,
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountInput: {
            height: 52,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 14,
            paddingHorizontal: 14,
            fontSize: 15,
            color: "#111827",
            backgroundColor: "#FFFFFF",
            marginBottom: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  amountSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },

  totalLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  totalAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
  },

  detailsContainer: {
    marginBottom: 24,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  paymentTypeCard: {
    width: 155,
    height: 74,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: "white",
  },

  activeCard: {
    borderColor: "#2F6B5F",
    backgroundColor: "#F4FBF8",
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF6F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  cardSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3,
  },

  methodsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  methodCard: {
    width: "48%",
    height: 92,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "white",
  },

  activeMethodCard: {
    borderColor: "#2F6B5F",
    backgroundColor: "#F4FBF8",
  },

  methodIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF6F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  methodText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  remarksInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
    fontSize: 14,
    color: "#111827",
    textAlignVertical: "top",
    marginBottom: 24,
  },

  collectButton: {
    height: 56,
    backgroundColor: "#2F6B5F",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  collectText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  successOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  elevation: 10,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
  },

successModal: {
  width: "90%",
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
  padding: 24,
},

tickContainer: {
  alignItems: "center",
  marginBottom: 16,
},

tickMark: {
  fontSize: 70,
  color: "#22C55E",
  fontWeight: "700",
},

successTitle: {
  fontSize: 32,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

successSubtitle: {
  fontSize: 16,
  color: "#6B7280",
  textAlign: "center",
  marginTop: 10,
},

successInfo: {
  marginTop: 30,
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},

infoLabel: {
  fontSize: 16,
  color: "#6B7280",
},

infoValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

whatsappButton: {
  height: 56,
  backgroundColor: "#25D366",
  borderRadius: 14,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 25,
},

whatsappButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
},

newInvoiceText: {
  textAlign: "center",
  marginTop: 24,
  fontSize: 20,
  fontWeight: "700",
  color: "#2F6B5F",
},
});