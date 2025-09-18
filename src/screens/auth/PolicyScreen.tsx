import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/Styles";
import ScreenContainer from "@/componenets/ui/ScreenContainer";

const PolicyScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>
          By using our platform and services, you agree to be bound by the
          following Terms of Service ("Terms"). Please read them carefully
          before using Game Plan.
        </Text>
        <Text style={styles.text}>
          User Registration To use some features of Game Plan, you may need to
          register and create an account. You must be at least 18 years old to
          register for an account. By registering for an account, you agree to
          provide accurate and complete information about yourself as prompted
          by the registration form. You are responsible for maintaining the
          confidentiality of your account login credentials.
        </Text>
        <Text style={styles.text}>
          Content You are solely responsible for any content you upload, post,
          share, or otherwise make available on Game Plan. By posting content,
          you grant Game Plan a non-exclusive, transferable, sub-licensable,
          royalty-free, worldwide license to use, display, reproduce, modify,
          and distribute the content in connection with Game Plan  User
          Registration To use some features of Game Plan, you may need to
          register and create an account. You must be at least 18 years old to
          register for an account. By registering for an account, you agree to
          provide accurate and complete information about yourself as prompted
          by the registration form. You are responsible for maintaining the
          confidentiality of your account login credentials.
        </Text>
        <Text style={styles.text}>
          Content You are solely responsible for any content you upload, post,
          share, or otherwise make available on Game Plan. By posting content,
          you grant Game Plan a non-exclusive, transferable, sub-licensable,
          royalty-free, worldwide license to use, display, reproduce, modify,
          and distribute the content in connection with Game Plan
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default PolicyScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
    gap: 10,
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
