import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "@/constants/Styles";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  style,
  value,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    zIndex: 10,
    left: 10,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 5],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: GlobalStyles.getColor("text.primary", 0.5),
    paddingHorizontal: 4,
  };

  const containerStyle = {
    backgroundColor: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [
        GlobalStyles.colors.background.card,
        GlobalStyles.colors.background.app,
      ],
    }),
    borderColor: error
      ? GlobalStyles.colors.primary
      : animatedLabel.interpolate({
          inputRange: [0, 1],
          outputRange: [
            GlobalStyles.colors.background.app,
            GlobalStyles.colors.border,
          ],
        }),
  };

  return (
    <View style={{ width: "100%" }}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, style]}
            value={value}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              style={styles.iconWrapper}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color={GlobalStyles.colors.text.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginTop: 14,
    paddingHorizontal: 12,
    minHeight: 44,
    fontSize: 14,
    color: GlobalStyles.colors.text.primary,
    fontWeight: "bold",
  },
  iconWrapper: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: GlobalStyles.colors.primary,
  },
});
