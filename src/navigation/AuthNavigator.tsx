import React, { useCallback } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import VerifyEmailScreen from "../screens/auth/VerifyEmailScreen";
import { ParamListBase } from "@react-navigation/native";
import { GlobalStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import OnBoarding from "@/screens/auth/OnBoarding";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PolicyScreen from "@/screens/auth/PolicyScreen";
import TermsScreen from "@/screens/auth/TermsScreen";
import ScreenContainer from "@/componenets/ui/ScreenContainer";
const Tab = createMaterialTopTabNavigator();
type ScreenOptionsProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};
export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
  PrivacyAndTerms: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function PrivacyAndTermsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.background.app,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.text.primary,
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
      }}
    >
      <Tab.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          title: "PRIVACY POLICY",
        }}
      />
      <Tab.Screen
        name="Terms"
        component={TermsScreen}
        options={{ title: "TERMS OF SERVICE" }}
      />
    </Tab.Navigator>
  );
}

const AuthNavigator = () => {
  const screenOptions = useCallback(
    ({ navigation }: ScreenOptionsProps): NativeStackNavigationOptions => ({
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: GlobalStyles.colors.background.app,
      },
      headerTintColor: GlobalStyles.colors.text.primary,
      headerTitleStyle: {
        fontSize: 18,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{
            width: 40,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={GlobalStyles.colors.text.primary}
          />
        </TouchableOpacity>
      ),
      headerShadowVisible: false,
      gestureEnabled: true,
      animation: "slide_from_right",
      contentStyle: { backgroundColor: GlobalStyles.colors.background.app },
    }),
    []
  );
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="OnBoarding"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log In with Email" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Sign Up With Email" }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: "Create New Password" }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ title: "Confirm Your Email" }}
      />
      <Stack.Screen
        name="PrivacyAndTerms"
        component={PrivacyAndTermsScreen}
        options={{ title: "Privacy & Terms" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
