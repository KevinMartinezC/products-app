import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemeLink from "@/presentation/theme/components/ThemeLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

const RegisterScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const { height } = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);
  const { control, handleSubmit, reset } = useForm<RegisterData>();
  const { register } = useAuthStore();

  const onRegister = async (data: RegisterData) => {
    setIsPosting(true);
    const wasSuccesful = await register(
      data.email,
      data.password,
      data.fullName
    );
    setIsPosting(false);

    if (wasSuccesful) {
      reset();
      Alert.alert(
        "🎉 ¡Registro Exitoso!",
        "Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión."
      );
      return;
    }
    Alert.alert(
      "⚠️ Error en el Registro",
      "No se pudo crear la cuenta. Verifica que los datos sean correctos e intenta nuevamente."
    );
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
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        <View style={style.inputsContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Nombre completo"
                keyboardType="email-address"
                autoCapitalize="words"
                icon="person-outline"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullName"
            rules={{ required: true }}
            defaultValue=""
          />

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
            children="Crear cuenta"
            disabled={isPosting}
            onPress={handleSubmit(onRegister)}
          />
        </View>

        <View style={style.linkContainer}>
          <ThemedText>Ya tienes cuenta?</ThemedText>
          <ThemeLink replace href="/auth/login" style={{ marginStart: 5 }}>
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
