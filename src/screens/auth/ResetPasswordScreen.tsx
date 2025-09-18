import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import InputField from "@/componenets/ui/InputField";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";

const ResetPasswordScreen = ({ navigation }) => {
  const [newPasswordForm, setNewPasswordForm] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });

  const [errors, setErrors] = useState<{
    newPassword?: string;
    repeatNewPassword?: string;
  }>({});

  const handleChange = (
    field: "newPassword" | "repeatNewPassword",
    value: string
  ) => {
    setNewPasswordForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const validateForm = () => {
    const { newPassword, repeatNewPassword } = newPasswordForm;
    let valid = true;
    const newErrors: typeof errors = {};

    if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
      valid = false;
    }

    if (newPassword !== repeatNewPassword) {
      newErrors.repeatNewPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSavePassword = () => {
    if (!validateForm()) return;

    navigation.navigate("Login");
  };

  return (
    <ScreenContainer
      style={{ justifyContent: "space-between", paddingVertical: 20 }}
    >
      <View>
        <View style={{ gap: 8 }}>
          <InputField
            label="New Password"
            secureTextEntry
            autoCapitalize="none"
            value={newPasswordForm.newPassword}
            onChangeText={(text) => handleChange("newPassword", text)}
            error={errors.newPassword}
          />
          <InputField
            label="Repeat New Password"
            secureTextEntry
            autoCapitalize="none"
            value={newPasswordForm.repeatNewPassword}
            onChangeText={(text) => handleChange("repeatNewPassword", text)}
            error={errors.repeatNewPassword}
          />
        </View>
      </View>
      <View>
        <Button
          title="Save New Password"
          onPress={handleSavePassword}
          style={{ marginTop: 10 }}
          disabled={
            !newPasswordForm.newPassword || !newPasswordForm.repeatNewPassword
          }
        />
      </View>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;

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
