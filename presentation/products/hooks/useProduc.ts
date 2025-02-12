import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

const useProduc = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });
  //mutacion

  //mantener el id del producto en caso de ser uno nuevo
  return {
    productQuery,
  };
};

export default useProduc;
