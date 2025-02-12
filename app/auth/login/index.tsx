import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemeLink from "@/presentation/theme/components/ThemeLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

interface LoginData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const { control, handleSubmit } = useForm<LoginData>();

  const onLogin = async (data: LoginData) => {
    setIsPosting(true);
    const wasSuccesful = await login(data.email, data.password);
    setIsPosting(false);

    if (wasSuccesful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Usuario o contrasena no son validos");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        style={{ ...style.scrollViewStyle, backgroundColor: backgroundColor }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        <View style={style.inputsContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Correo Electronico"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Contrasena"
                secureTextEntry
                autoCapitalize="none"
                icon="lock-closed-outline"
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={style.buttonContainer}>
          <ThemedButton
            icon="arrow-forward"
            children="Ingresar"
            disabled={isPosting}
            onPress={handleSubmit(onLogin)}
          />
        </View>

        <View style={style.linkContainer}>
          <ThemedText>No tienes cuenta?</ThemedText>
          <ThemeLink replace href="/auth/register" style={{ marginStart: 5 }}>
            Crear cuenta
          </ThemeLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: 40,
  },
  inputsContainer: {
    marginTop: 20,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 50,
  },
});

export default LoginScreen;
