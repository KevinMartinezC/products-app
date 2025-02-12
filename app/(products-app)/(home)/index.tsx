import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";
import ProductList from "@/presentation/products/components/ProductList";
import { FAB } from "@/presentation/theme/components/FAB";
import { router } from "expo-router";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();
  const primary = useThemeColor({}, "primary");

  if (productsQuery.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={style.container}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
      <FAB iconName="add-outline" onPress={()=> router.push('/(products-app)/product/new')}/>
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
