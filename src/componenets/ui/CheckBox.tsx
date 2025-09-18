import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "@/constants/Styles";

const CheckBox = ({ check, setCheck, size = 25 }) => {
  return (
    <TouchableOpacity
      onPress={() => setCheck(!check)}
      style={{
        width: size,
        height: size,
        borderWidth: 2,
        borderColor: check
          ? GlobalStyles.colors.primary
          : GlobalStyles.getColor("background.button", 0.3),
        borderRadius: size * 0.3,
        overflow: "hidden",
      }}
    >
      {check && (
        <View
          style={{
            backgroundColor: GlobalStyles.colors.primary,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="checkmark"
            size={size * 0.7}
            color={GlobalStyles.colors.white}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
