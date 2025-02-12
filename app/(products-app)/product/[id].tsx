import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import useProduc from "@/presentation/products/hooks/useProduc";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";

const ProducScreen = () => {
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduc(`${id}`);

  const navigation = useNavigation();
  useEffect(() => {
    //Todo colocar nombre producto
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    <LoadingIndicator />;
  }

  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ThemedView style={style.container}>
          <ThemedTextInput placeholder="Titulo" style={style.titleInputt} />
          <ThemedTextInput placeholder="Slug" style={style.titleInputt} />
          <ThemedTextInput
            placeholder="Descripcion"
            style={style.titleInputt}
            multiline
            numberOfLines={5}
          />
        </ThemedView>
        <ThemedView style={style.subContainer}>
          <ThemedTextInput
            placeholder="Precio"
            containerStyle={style.priceInput}
          />
          <ThemedTextInput
            placeholder="Inventario"
            containerStyle={style.priceInput}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProducScreen;

const style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  titleInputt: {
    marginVertical: 5,
  },
  subContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    gap: 10,
  },
  priceInput: {
    flex: 1,
  },
});
