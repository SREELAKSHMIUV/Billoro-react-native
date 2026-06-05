import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import { router } from "expo-router";

import Footer from "../components/Footer";

export default function InvoiceCreateScreen() {
  const [invoiceNo, setInvoiceNo] =
    useState("");

  const [phone, setPhone] = useState("");

  const [vehicle, setVehicle] =
    useState("");

  const [name, setName] = useState("");

  const [errors, setErrors] =
    useState<any>({});

  const [loyalty, setLoyalty] =
    useState(false);

  const [promo, setPromo] =
    useState(true);

  const [date, setDate] = useState(
    new Date()
  );

  const [showPicker, setShowPicker] =
    useState(false);

  const validate = () => {
    let newErrors: any = {};

    if (!invoiceNo)
      newErrors.invoice =
        "Invoice is required";

    if (!phone)
      newErrors.phone =
        "Phone is required";
    else if (phone.length !== 10)
      newErrors.phone =
        "Enter valid 10-digit number";

    if (!vehicle)
      newErrors.vehicle =
        "Vehicle number is required";

    if (!name)
      newErrors.name =
        "Customer name is required";

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

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
            <View style={styles.activeDot} />

            <Text style={styles.activeText}>
              Customer
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.stepItem}>
            <View style={styles.inactiveDot} />

            <Text style={styles.inactiveText}>
              Items
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.stepItem}>
            <View style={styles.inactiveDot} />

            <Text style={styles.inactiveText}>
              Review
            </Text>
          </View>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Invoice
          </Text>

          {/* INVOICE + DATE */}
          <View style={styles.rowTop}>
            <View
              style={{
                flex: 1,
                marginRight: 10,
              }}
            >
              <Text style={styles.label}>
                Invoice No
              </Text>

              <TextInput
                placeholder="INV-001"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={invoiceNo}
                onChangeText={setInvoiceNo}
              />

              {errors.invoice && (
                <Text style={styles.errorText}>
                  {errors.invoice}
                </Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                Date
              </Text>

              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  setShowPicker(true)
                }
              >
                <Text style={styles.dateText}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PHONE */}
          <Text style={styles.label}>
            Customer phone
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>
              +91
            </Text>

            <TextInput
              placeholder="Enter 10 digits"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              style={styles.inputField}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {errors.phone && (
            <Text style={styles.errorText}>
              {errors.phone}
            </Text>
          )}

          {/* VEHICLE */}
          <Text style={styles.label}>
            Vehicle Number
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter vehicle number"
              placeholderTextColor="#9CA3AF"
              style={styles.inputField}
              value={vehicle}
              onChangeText={setVehicle}
            />

            <Ionicons
              name="add-circle-outline"
              size={22}
              color="#6B7280"
            />
          </View>

          {errors.vehicle && (
            <Text style={styles.errorText}>
              {errors.vehicle}
            </Text>
          )}

          {/* NAME */}
          <Text style={styles.label}>
            Customer name
          </Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {errors.name && (
            <Text style={styles.errorText}>
              {errors.name}
            </Text>
          )}

          {/* CHECKBOX */}
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                loyalty &&
                  styles.checked,
              ]}
              onPress={() =>
                setLoyalty(!loyalty)
              }
            >
              {loyalty && (
                <Text
                  style={styles.checkmark}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            <Text
              style={styles.checkboxText}
            >
              Join loyalty membership
            </Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                promo && styles.checked,
              ]}
              onPress={() =>
                setPromo(!promo)
              }
            >
              {promo && (
                <Text
                  style={styles.checkmark}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            <Text
              style={styles.checkboxText}
            >
              Receive promotional messages
            </Text>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.resetButton}
            >
              <Text style={styles.resetText}>
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
              if (validate()) {
                  router.replace({
                  pathname: "/invoices-items",
                    params: {
                      invoiceNo,
                      phone,
                      vehicle,
                      name,
                      date: date.toISOString(),
                    },
                  });
                }
              }}
            >
              <Text style={styles.nextText}>
                Next →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* DATE PICKER */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(
            event: any,
            selectedDate?: Date
          ) => {
            if (selectedDate)
              setDate(selectedDate);

            setShowPicker(false);
          }}
        />
      )}
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
    justifyContent: "space-between",
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
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 14,
  },

  stepItem: {
    alignItems: "center",
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

  line: {
    width: 55,
    height: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 6,
  },

  activeText: {
    fontSize: 12,
    color: "#146C43",
    marginTop: 6,
    fontWeight: "600",
  },

  inactiveText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  rowTop: {
    flexDirection: "row",
  },

  label: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    marginTop: 4,
  },

  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
  },

  prefix: {
    marginRight: 6,
    color: "#111827",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 4,
    fontSize: 15,
    color: "#111827",
  },

  dateText: {
    fontSize: 15,
    color: "#111827",
  },

  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 5,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "white",
  },

  checked: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  checkmark: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },

  checkboxText: {
    fontSize: 14,
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 24,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  resetButton: {
    width: "30%",
    height: 52,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  resetText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  nextButton: {
    width: "66%",
    height: 52,
    backgroundColor: "#146C43",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  nextText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});