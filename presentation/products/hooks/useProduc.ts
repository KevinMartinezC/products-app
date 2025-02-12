import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { queryClient } from "@/core/utils/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

const useProduc = (productId: string) => {
  const productIdRef = useRef(productId); //new/uuid
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const productUpdate = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),
    onSuccess(data: Product) {
      //invalidar prodcuto queries
      productIdRef.current = data.id;

      queryClient.invalidateQueries({
        queryKey: ["product", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });

      Alert.alert("Producto Guardado", `${data.title} se guardo correctamente`);
    },
    onError(data: Product) {
      Alert.alert(
        "Error",
        `${data.title} no se guardo correctamente, verifique los datos ingresados`
      );
    },
  });

  //mantener el id del producto en caso de ser uno nuevo
  return {
    productQuery,
    productUpdate,
    fetchProduct: productQuery.refetch,
  };
};

export default useProduc;
