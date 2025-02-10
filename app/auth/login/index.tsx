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

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView>
      <ScrollView style={style.scrollViewStyle}>
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{color: 'gray'}}>Por favor ingrese para continuar</ThemedText>
        </View>

        <View style={style.inputsContainer}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: 40,
  },
  inputsContainer: {
    marginTop: 20
  }
});


export default LoginScreen;
