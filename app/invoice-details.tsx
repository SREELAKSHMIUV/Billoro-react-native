import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getInvoiceDetails } from "../services/invoiceApi";

export default function InvoiceDetails() {
  const { invoiceId } = useLocalSearchParams();

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadInvoice = async () => {
    try {
      const response = await getInvoiceDetails(
        invoiceId as string
      );

      console.log(
        "INVOICE DETAILS:",
        JSON.stringify(response, null, 2)
      );

      setInvoice(response.data);
    } catch (error) {
      console.log("DETAIL ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      loadInvoice();
    }
  }, [invoiceId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: 50,
      }}
    >
      <Text>Invoice Number:</Text>
      <Text>{invoice?.invoice_number}</Text>

      <Text style={{ marginTop: 20 }}>
        Customer:
      </Text>
      <Text>{invoice?.customer?.name}</Text>

      <Text style={{ marginTop: 20 }}>
        Amount:
      </Text>
      <Text>
        ₹{invoice?.totals?.final_total}
      </Text>
    </View>
  );
}