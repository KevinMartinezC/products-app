import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "cheking") {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle: {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
        }}
      />
    </Stack>
  );
};

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default CheckAuthenticationLayout;
