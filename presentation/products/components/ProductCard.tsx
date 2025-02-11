import { Product } from "@/core/products/interfaces/product.interface";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { router } from "expo-router";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView style={style.container}>
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
        {product.images.length === ZERO_VALUE ? (
          <Image
            source={require("../../../assets/images/no-product-image.png")}
            style={style.noProductImage}
          />
        ) : (
          <Image source={{ uri: product.images[0] }} style={style.image} />
        )}

        <ThemedText
          numberOfLines={NUMBER_OF_LINES}
          style={style.text}
          darkColor={"black"}
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    margin: 3,
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
  },
  noProductImage: {
    width: "100%",
    height: 200,
  },
  image: {
    flex: 1,
    height: 200,
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
});

//CONST
const NUMBER_OF_LINES = 2;
const ZERO_VALUE = 0;
