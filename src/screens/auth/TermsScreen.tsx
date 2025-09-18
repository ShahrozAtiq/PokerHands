import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/Styles";
import ScreenContainer from "@/componenets/ui/ScreenContainer";

const TermsScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>
          This is where your Terms and Conditions content goes. Explain the
          rules and guidelines for using the app.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: GlobalStyles.colors.text.primary,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: GlobalStyles.colors.text.secondary,
  },
});
