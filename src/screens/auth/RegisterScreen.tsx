import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import InputField from "@/componenets/ui/InputField";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";
import CheckBox from "@/componenets/ui/CheckBox";
import LoadingOverlay from "@/componenets/ui/LoadingOverlay";

const RegisterScreen = ({ navigation }) => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    repeatPassword?: string;
    acceptTerms?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: "email" | "password" | "repeatPassword" | "acceptTerms",
    value: string | boolean
  ) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const validateForm = () => {
    const { email, password, repeatPassword, acceptTerms } = registerForm;
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

    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and Privacy Policy.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("VerifyEmail");
    }, 5000);
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
            value={registerForm.email}
            onChangeText={(text) => handleChange("email", text)}
            error={errors.email}
          />
          <InputField
            label="Password"
            secureTextEntry
            autoCapitalize="none"
            value={registerForm.password}
            onChangeText={(text) => handleChange("password", text)}
            error={errors.password}
          />
          <InputField
            label="Repeat Password"
            secureTextEntry
            autoCapitalize="none"
            value={registerForm.repeatPassword}
            onChangeText={(text) => handleChange("repeatPassword", text)}
            error={errors.repeatPassword}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <CheckBox
            size={22}
            check={registerForm.acceptTerms}
            setCheck={(newValue) => handleChange("acceptTerms", newValue)}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.terms}>
              I agree to our{" "}
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
            {errors.acceptTerms ? (
              <Text style={styles.errorText}>{errors.acceptTerms}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          style={{ marginTop: 10 }}
        />
      </View>
      <LoadingOverlay visible={loading} title="Signing Up..." />
    </ScreenContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  terms: {
    color: GlobalStyles.colors.text.secondary,
    lineHeight: 20,
  },
  link: {
    color: GlobalStyles.colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
