import React, { useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles } from "@/constants/Styles";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary" | "success";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
  isLoading = false,
}) => {
  const backgroundColor =
    variant === "primary"
      ? GlobalStyles.colors.background.button
      : variant === "success"
      ? GlobalStyles.colors.success
      : "transparent";

  const textColor =
    variant === "secondary"
      ? GlobalStyles.colors.text.primary
      : GlobalStyles.colors.white ?? "#FFF";

  const spinnerColor =
    variant === "secondary"
      ? GlobalStyles.colors.text.primary
      : GlobalStyles.colors.white ?? "#FFF";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={variant === "primary" ? 0.8 : 0.5}
    >
      {isLoading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 999,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.getColor("background.button", 0.2),
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  loadingText: {
    textTransform: "none",
  },
});

export default Button;
