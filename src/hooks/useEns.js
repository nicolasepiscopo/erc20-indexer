import { useQuery } from "@tanstack/react-query";
import { alchemy } from "../lib/alchemy";
import { useToast } from "@chakra-ui/react";

export function useEns (address) {
  const toast = useToast();
  const isEnsFormat = address.includes('.eth');
  const { data } = useQuery({
    queryKey: ['ens', address],
    queryFn: async () => 
      isEnsFormat ? await alchemy.core.resolveName(address) : address,
    enabled: isEnsFormat,
    onError: () => {
      toast({
        title: "Error resolving ENS name",
        description: "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  });

  return {
    address: data,
    isEnsFormat,
  }
}