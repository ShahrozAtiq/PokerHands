import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import InputField from "@/componenets/ui/InputField";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleResetPassword = () => {
    if (!validateEmail()) return;

    // ✅ proceed with reset password flow
    navigation.navigate("ResetPassword");
  };

  return (
    <ScreenContainer
      style={{ justifyContent: "space-between", paddingVertical: 20 }}
    >
      <View style={{ gap: 20 }}>
        <Text
          style={{
            paddingHorizontal: 50,
            color: GlobalStyles.colors.text.secondary,
            textAlign: "center",
          }}
        >
          We will send you an email to reset your password
        </Text>
        <InputField
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          error={error}
        />
      </View>
      <View>
        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          style={{ marginTop: 10 }}
          disabled={!email}
        />
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
