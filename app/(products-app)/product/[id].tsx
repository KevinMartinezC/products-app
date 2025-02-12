import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import useProduc from "@/presentation/products/hooks/useProduc";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";
import ProductImages from "@/presentation/products/components/ProductImages";
import ThemedButtonGroup from "@/presentation/theme/components/ThemeButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { Product } from "@/core/products/interfaces/product.interface";

const ProducScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery, productUpdate, fetchProduct } = useProduc(`${id}`);
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: async () => {
      const { data } = await fetchProduct();
      return data as Product;
    },
  });

  const onSave = async (data: Product) => {
    productUpdate.mutate(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
    return () => console.log("cleaninng");
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <Controller
          control={control}
          name="images"
          render={({ field: { value } }) => (
            <ProductImages images={value ?? []} />
          )}
        />

        <ThemedView style={style.container}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                placeholder="Título"
                style={{ marginVertical: 5 }}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="slug"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                placeholder="Slug"
                style={style.titleInputt}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                placeholder="Descripcion"
                style={style.titleInputt}
                multiline
                numberOfLines={5}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </ThemedView>
        <ThemedView style={style.subContainer}>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                placeholder="Precio"
                containerStyle={style.priceInput}
                value={(value ?? "").toString()}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="stock"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                placeholder="Inventario"
                containerStyle={style.priceInput}
                value={(value ?? "").toString()}
                onChangeText={onChange}
              />
            )}
          />
        </ThemedView>
        <ThemedView style={style.buttonGroupContainer}>
          <Controller
            control={control}
            name="sizes"
            render={({ field: { onChange, value } }) => (
              <ThemedButtonGroup
                options={SIZE_OPTIONS}
                selectedOptions={value ?? []}
                onSelect={(selectedSize) => {
                  const newSizes = value.includes(selectedSize)
                    ? value.filter((s) => s !== selectedSize)
                    : [...value, selectedSize];
                  onChange(newSizes);
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <ThemedButtonGroup
                options={GENDER_OPTIONS}
                selectedOptions={[value]}
                onSelect={(options) => onChange(options)}
              />
            )}
          />
        </ThemedView>
        <View style={style.buttonContainer}>
          <ThemedButton icon="save-outline" onPress={handleSubmit(onSave)}>
            Guardar
          </ThemedButton>
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

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const GENDER_OPTIONS = ["kid", "men", "women", "unisex"];
