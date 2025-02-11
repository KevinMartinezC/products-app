import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemeLink from "@/presentation/theme/components/ThemeLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

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
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        <View style={style.inputsContainer}>
          <ThemedTextInput
            placeholder="Nombre completo"
            keyboardType="email-address"
            autoCapitalize="words"
            icon="person"
          />

          <ThemedTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Contrasena"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>

        <View style={style.buttonContainer}>
          <ThemedButton icon="arrow-forward" children="Crear cuenta" />
        </View>

        <View style={style.linkContainer}>
          <ThemedText>Ya tienes cuenta?</ThemedText>
          <ThemeLink href="/auth/login" style={{ marginStart: 5 }}>
            Ingresar
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

export default RegisterScreen;
