import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

type FooterProps = {
  active: string;
};

export default function Footer({
  active,
}: FooterProps) {
  const tabs = [
    {
      icon: "grid-outline",
      label: "Home",
      route: "/home",
    },

    {
      icon: "document-text-outline",
      label: "Invoices",
      route: "/invoices",
    },

    {
      icon: "calendar-outline",
      label: "Bookings",
      route: "/bookings",
    },

    {
      icon: "construct-outline",
      label: "Job Cards",
      route: "/jobcards",
    },

    {
      icon: "bar-chart-outline",
      label: "Reports",
      route: "/reports",
    },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.footerItem}
          onPress={() =>
            router.push(tab.route as any)
          }
        >
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={
              active === tab.label
                ? "#146C43"
                : "#6B7280"
            }
          />

          <Text
            style={[
              styles.footerText,

              active === tab.label && {
                color: "#146C43",
                fontWeight: "600",
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,

  height: 82,

  backgroundColor: "white",

  borderTopWidth: 1,
  borderTopColor: "#E5E7EB",

  paddingBottom: 12,
  paddingTop: 10,
},

  footerItem: {
    alignItems: "center",
  },

  footerText: {
    fontSize: 11,
    marginTop: 4,
    color: "#6B7280",
  },
});