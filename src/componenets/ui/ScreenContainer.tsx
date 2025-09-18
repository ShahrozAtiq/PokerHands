// components/ScreenContainer.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/Styles";

interface ScreenContainerProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom }, // 👈 add some spacing + safe inset
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background.app,
    paddingHorizontal: 20,
  },
});

export default ScreenContainer;
