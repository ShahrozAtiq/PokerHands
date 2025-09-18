import { GlobalStyles } from "@/constants/Styles";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function VerificationCode({
  callback,
  reset,
  isLoading,
  error = null,
}) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Refs to control each digit input element
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Reset all inputs and clear state
  const resetCode = () => {
    setCode(["", "", "", ""]);
    setFocusedIndex(0);
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  };

  // Call our callback when code = 4 chars
  useEffect(() => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      if (typeof callback === "function") callback(fullCode);
      // Don't reset automatically - let parent handle success/error
    }
  }, [code]); //eslint-disable-line

  // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Handle input
  function handleInput(text, index) {
    // Only allow single character
    const char = text.slice(-1);

    const newCode = [...code];

    // Convert lowercase letters to uppercase
    if (/^[a-z]$/.test(char)) {
      newCode[index] = char.toUpperCase();
    } else if (/^[A-Z0-9]$/.test(char) || char === "") {
      newCode[index] = char;
    } else {
      return; // Invalid character, don't update
    }

    setCode(newCode);

    // Move to next input if character was entered
    if (char && index < 3) {
      setFocusedIndex(index + 1);
      inputRefs[index + 1].current.focus();
    }
  }

  // Handle key press (for backspace)
  function handleKeyPress(e, index) {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];

      if (newCode[index]) {
        // Clear current field
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous field and clear it
        newCode[index - 1] = "";
        setCode(newCode);
        setFocusedIndex(index - 1);
        inputRefs[index - 1].current.focus();
      }
    }
  }

  // Handle focus
  function handleFocus(index) {
    setFocusedIndex(index);
  }

  // Calculate container width (screen width with horizontal margins and max 300px)
  const horizontalMargin = 32; // 16px on each side
  const containerWidth = Math.min(screenWidth - horizontalMargin, 300);

  // Calculate individual input width (container width divided by 4, minus gaps and padding)
  const inputWidth = (containerWidth - 48) / 4; // 48 = 3 gaps (8px each) + container padding (24px)

  // Set height equal to width for square boxes
  const inputHeight = inputWidth;

  // Calculate font size based on box size (roughly 35% of box size)
  const fontSize = Math.max(inputWidth * 0.35, 12); // Minimum 12px font size

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { width: containerWidth }]}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
              error && styles.inputError,
              isLoading && styles.inputDisabled,
              {
                width: inputWidth,
                height: inputHeight,
                fontSize: fontSize,
              },
            ]}
            maxLength={1}
            value={code[index]}
            onChangeText={(text) => handleInput(text, index)}
            ref={inputRefs[index]}
            autoFocus={index === 0}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            editable={!isLoading}
            textAlign="center"
            autoCapitalize="characters"
            autoCorrect={false}
            keyboardType="default"
            selectTextOnFocus={true}
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  input: {
    fontWeight: "600",
    backgroundColor: GlobalStyles.colors.background.card,
    color: "#000000",
    textAlign: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: GlobalStyles.colors.border,
    backgroundColor: GlobalStyles.colors.background.app,
  },
  inputError: {
    borderColor: GlobalStyles.colors.primary, // Red border for error state
  },
  inputDisabled: {
    opacity: 0.5,
  },
  clearButton: {
    marginTop: 8,
    padding: 8,
  },

  errorText: {
    fontSize: 14,
    color: GlobalStyles.colors.primary,
    marginTop: 4,
    textAlign: "center",
  },
});
