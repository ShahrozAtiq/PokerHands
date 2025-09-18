import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";
const OnBoarding = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Center logo + tagline */}
        <View style={styles.centerSection}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon} />
            <Text style={styles.logoText}>game plan</Text>
          </View>

          <Text style={styles.subtitle}>AI-powered poker hand</Text>
          <Text style={styles.subtitle}>analysis & logging</Text>
        </View>
      </View>

      {/* Bottom section with buttons + terms */}
      <View style={styles.bottomSection}>
        <Button
          title="Sign up with email"
          variant="primary"
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          title="Log in"
          variant="secondary"
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 10 }}
        />

        <Text style={styles.terms}>
          By logging in or signing up, you agree to our{" "}
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("PrivacyAndTerms", { screen: "Terms" })
            }
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("PrivacyAndTerms", { screen: "Policy" })
            }
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  logoIcon: {
    backgroundColor: GlobalStyles.colors.background.button,
    height: 36,
    width: 36,
    borderRadius: 13,
  },
  logoText: {
    fontSize: 25,
    color: GlobalStyles.colors.text.primary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: GlobalStyles.colors.text.secondary,
    textAlign: "center",
  },
  bottomSection: {
    alignItems: "center",
  },
  terms: {
    textAlign: "center",
    color: GlobalStyles.colors.text.secondary,
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  link: {
    color: GlobalStyles.colors.primary,
  },
});
