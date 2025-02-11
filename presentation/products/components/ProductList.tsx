import { View, Text } from "react-native";
import React from "react";
import { Product } from "@/core/products/interfaces/product.interface";
import { FlatList } from "react-native-gesture-handler";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  return (
    <FlatList
      data={products}
      numColumns={NUM_OF_COLUMNS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
};

export default ProductList;

const NUM_OF_COLUMNS = 2
