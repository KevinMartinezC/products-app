import { View, Image, FlatList, StyleSheet } from "react-native";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  if (images.length === 0) {
    return (
      <View style={style.noImageContainer}>
        <Image
          source={require("../../../assets/images/no-product-image.png")}
          style={style.noImageStyle}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={style.imageStyle} />
      )}
    />
  );
};

export default ProductImages;

const style = StyleSheet.create({
  noImageContainer: {
    flex: 1,
    alignItems: "center",
  },
  noImageStyle: {
    width: 300,
    height: 300,
  },
  imageStyle: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
    borderRadius: 5,
  },
});
