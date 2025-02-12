import React, { useState } from "react";
import { Product } from "@/core/products/interfaces/product.interface";
import { ProductCard } from "./ProductCard";
import { FlatList, RefreshControl } from "react-native";
import { queryClient } from "@/core/utils/queryClient";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={NUM_OF_COLUMNS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;

const NUM_OF_COLUMNS = 2;
