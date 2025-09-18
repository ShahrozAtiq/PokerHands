import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import InputField from "@/componenets/ui/InputField";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";

const LoginScreen = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: "email" | "password", value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const validateForm = () => {
    const { email, password } = loginForm;
    let valid = true;
    const newErrors: typeof errors = {};

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <ScreenContainer
      style={{ justifyContent: "space-between", paddingVertical: 20 }}
    >
      <View>
        <View style={{ gap: 8 }}>
          <InputField
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={loginForm.email}
            onChangeText={(text) => handleChange("email", text)}
            error={errors.email}
          />
          <InputField
            label="Password"
            secureTextEntry
            autoCapitalize="none"
            value={loginForm.password}
            onChangeText={(text) => handleChange("password", text)}
            error={errors.password}
          />
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text
            style={{
              color: GlobalStyles.colors.text.primary,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.terms}>
          By continuing you agree to our{" "}
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
        <Button
          title="Log in"
          onPress={handleLogin}
          style={{ marginTop: 10 }}
          disabled={!loginForm.email || !loginForm.password}
          isLoading={isLoading}
        />
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  terms: {
    color: GlobalStyles.colors.text.secondary,
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  link: {
    color: GlobalStyles.colors.primary,
  },
});
