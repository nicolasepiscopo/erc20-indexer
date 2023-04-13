import { useMutation } from "@tanstack/react-query";
import { alchemy } from "../lib/alchemy";
import { useToast } from "@chakra-ui/react";
import { useEns } from "./useEns";

export function useTokenBalances (userAddress) {
  const toast = useToast();
  const { address } = useEns(userAddress);
  const { mutate: getTokenBalances, data = {}, isSuccess, isLoading } = useMutation({
    mutationKey: 'tokenBalances',
    mutationFn: async () => {
      const { tokenBalances } = await alchemy.core.getTokenBalances(address);
      const tokenDataPromises = tokenBalances.map((balance) => alchemy.core.getTokenMetadata(
        balance.contractAddress
      ));

      return {
        tokenBalances,
        tokenDataObjects: await Promise.all(tokenDataPromises),
      }
    },
    onError: () => {
      toast({
        title: "Error fetching token balances",
        description: "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  });
  const { tokenBalances = [], tokenDataObjects = [] } = data;

  return {
    getTokenBalances,
    tokenBalances,
    tokenDataObjects,
    isSuccess,
    isLoading,
  }
}