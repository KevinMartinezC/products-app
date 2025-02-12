import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import useProduc from "@/presentation/products/hooks/useProduc";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";
import ProductImages from "@/presentation/products/components/ProductImages";
import ThemedButtonGroup from "@/presentation/theme/components/ThemeButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";

const ProducScreen = () => {
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduc(`${id}`);

  const navigation = useNavigation();
  useEffect(() => {
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

  if (productQuery.isLoading || !productQuery.data) {
    return <LoadingIndicator />;
  }

  const product = productQuery.data;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={product.images} />
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
        <ThemedView style={style.buttonGroupContainer}>
          <ThemedButtonGroup
            options={["XS", "S", "M", "L", "XL", "XXL", "XXL"]}
            selectedOptions={product.sizes}
            onSelect={(options) => console.log({ options })}
          />

          <ThemedButtonGroup
            options={["kid", "men", "women", "unisex"]}
            selectedOptions={[product.gender]}
            onSelect={(options) => console.log({ options })}
          />
        </ThemedView>
        <View style={style.buttonContainer}>
          <ThemedButton icon="save-outline">Guardar</ThemedButton>
        </View>
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
  buttonGroupContainer: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginBottom: 50,
    marginTop: 20,
  },
});
