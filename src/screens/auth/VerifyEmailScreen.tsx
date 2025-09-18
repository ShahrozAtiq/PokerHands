import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
import VarificationCode from "@/componenets/ui/VarificationCode";
import { GlobalStyles } from "@/constants/Styles";
import Button from "@/componenets/ui/Button";

const VerifyEmailScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(false);
  const [code, setCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Countdown timer for resend functionality
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => {
          if (timer <= 1) {
            setCanResend(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Handle verification code submission
  const handleCodeSubmit = (enteredCode) => {
    console.log("Code entered:", enteredCode);
    setCode(enteredCode);
    setIsLoading(true);
    setError(null);

    // Simulate API call with 5 second delay
    setTimeout(() => {
      setIsLoading(false);
      setError("Invalid verification code. Please try again.");
    }, 5000);
  };

  // Handle continue button press
  const handleContinue = () => {
    if (code.length === 4) {
      handleCodeSubmit(code);
    }
  };

  // Handle resend email
  const handleResendEmail = () => {
    if (canResend) {
      console.log("Resending email...");
      setCanResend(false);
      setResendTimer(120); // 2 minutes = 120 seconds
      setError(null);
      setReset((prev) => !prev); // Toggle reset to clear the verification code

      // Simulate resend API call
      setTimeout(() => {
        console.log("Email resent successfully");
      }, 1000);
    }
  };

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <ScreenContainer
      style={{ justifyContent: "space-between", paddingVertical: 20 }}
    >
      <View style={{ gap: 15, alignItems: "center" }}>
        <Text
          style={{
            color: GlobalStyles.colors.text.secondary,
            textAlign: "center",
          }}
        >
          We sent a code to jpeterson@gmail.com
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: GlobalStyles.colors.primary,
              fontWeight: "bold",
            }}
          >
            Change Email
          </Text>
        </TouchableOpacity>

        <VarificationCode
          isLoading={isLoading}
          callback={handleCodeSubmit}
          reset={reset}
          error={error}
        />

        <Text
          style={{
            color: GlobalStyles.colors.text.secondary,
            textAlign: "center",
          }}
        >
          Didn't get the email? Check your spam folder or resend it
        </Text>

        <TouchableOpacity
          onPress={handleResendEmail}
          disabled={!canResend}
          style={{ opacity: canResend ? 1 : 0.6 }}
        >
          <Text
            style={{
              color: canResend
                ? GlobalStyles.colors.primary
                : GlobalStyles.colors.text.secondary,
              fontWeight: "bold",
            }}
          >
            {canResend
              ? "Resend email"
              : `Resend in ${formatTimer(resendTimer)}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Button
          title="Continue"
          onPress={handleContinue}
          style={{ marginTop: 10 }}
          disabled={code.length !== 4}
          isLoading={isLoading}
        />
      </View>
    </ScreenContainer>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({});
