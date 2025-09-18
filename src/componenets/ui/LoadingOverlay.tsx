import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/Styles";

type LoadingOverlayProps = {
  visible?: boolean;
  title?: string;
  size?: "small" | "large";
  color?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = true,
  title,
  size = "large",
  color,
}) => {
  const spinnerColor = color || GlobalStyles.colors.primary || "#007AFF";

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator
            size={size}
            color={spinnerColor}
            style={styles.spinner}
          />
          {title && (
            <Text style={[styles.title, { color: spinnerColor }]}>{title}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: GlobalStyles.getColor("background.app", 0.7),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    minWidth: 120,
    maxWidth: 200,
  },
  spinner: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
});
