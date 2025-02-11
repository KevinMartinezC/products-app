import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "../store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";

const LogoutIconButton = () => {
  const primayColor = useThemeColor({}, "primary");
  const { logout } = useAuthStore();

  const logoutFun = () => {
    logout();
  };

  return (
    <TouchableOpacity style={style.container} onPressOut={logoutFun}>
      <Ionicons name="log-out-outline" size={24} color={primayColor} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginRight: 8,
  },
});

export default LogoutIconButton;
