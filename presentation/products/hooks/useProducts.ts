import { getProducts } from "@/core/products/actions/get-products.action";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),
    staleTime: 1000 * 60 * 60, // 1 hora
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  return {
    productsQuery,

    //methods
    loadNextPage: productsQuery.fetchNextPage
  };
};

//[[p1,p2,p4],[p5,p6,p7]]
