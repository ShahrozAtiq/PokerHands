import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase/client";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Get initial session
    checkAuthState();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      setSession(session);
      setUser(session?.user || null);
      setLoading(false);

      if (initializing) {
        setInitializing(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [initializing]);

  const checkAuthState = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        return;
      }

      setSession(session);
      setUser(session?.user || null);
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
      setInitializing(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: error.message || "An error occurred during sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userData.username,
            full_name: userData.fullName,
            avatar_url: userData.avatarUrl,
            ...userData,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Check if user needs email confirmation
      if (data.user && !data.session) {
        return {
          success: true,
          data,
          needsVerification: true,
          message: "Please check your email to verify your account",
        };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: error.message || "An error occurred during sign up",
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      setUser(null);
      setSession(null);
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      return {
        success: false,
        error: error.message || "An error occurred during sign out",
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "your-poker-app://reset-password",
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Password reset email sent. Please check your inbox.",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        error: error.message || "An error occurred while sending reset email",
      };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Password updated successfully",
      };
    } catch (error) {
      console.error("Update password error:", error);
      return {
        success: false,
        error: error.message || "An error occurred while updating password",
      };
    }
  };

  const resendVerification = async (email) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Verification email resent. Please check your inbox.",
      };
    } catch (error) {
      console.error("Resend verification error:", error);
      return {
        success: false,
        error:
          error.message || "An error occurred while resending verification",
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    initializing,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendVerification,
    checkAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
