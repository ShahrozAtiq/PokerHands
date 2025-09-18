import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/Styles";

interface ScreenContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  // Flatten style to access padding properties
  const flatStyle = StyleSheet.flatten(style) || {};

  let paddingTop = 0;
  let paddingBottom = 0;

  // Step 1: Check for paddingVertical first
  if (typeof flatStyle.paddingVertical === "number") {
    // Divide paddingVertical into paddingTop and paddingBottom, then add insets
    paddingTop = flatStyle.paddingVertical;
    paddingBottom = flatStyle.paddingVertical + insets.bottom;

    // Remove paddingVertical from the style to avoid conflicts
    const { paddingVertical, ...restStyle } = flatStyle;

    return (
      <View
        style={[styles.container, restStyle, { paddingTop, paddingBottom }]}
      >
        {children}
      </View>
    );
  }

  // Step 2: If paddingVertical is not available, check for paddingBottom
  if (typeof flatStyle.paddingBottom === "number") {
    paddingBottom = flatStyle.paddingBottom + insets.bottom;

    return (
      <View style={[styles.container, style, { paddingBottom }]}>
        {children}
      </View>
    );
  }

  // Step 3: If neither paddingVertical nor paddingBottom are available, add only inset to paddingBottom
  paddingBottom = insets.bottom;

  return (
    <View style={[styles.container, style, { paddingBottom }]}>{children}</View>
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
