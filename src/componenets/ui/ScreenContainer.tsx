// components/ScreenContainer.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { GlobalStyles } from "@/constants/Styles";

interface ScreenContainerProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background.app,
    paddingHorizontal: 20,
  },
});

export default ScreenContainer;
