import { useQuery } from "@tanstack/react-query";
import { useToast } from '@chakra-ui/react'

/**
 * A hook to get the client wallet address
 * @returns {string} wallet address
 */
export function useWalletAddress () {
  const toast = useToast();
  const { data } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const hasWallet = !!window.ethereum;

      if (hasWallet) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        return accounts[0];
      } else {
        toast({
          title: "No wallet detected",
          description: "Please install MetaMask or Apex to continue",
          status: "error",
          duration: 9000,
          isClosable: false,
        })
      }

      return null;
    }
  });

  return data;
}