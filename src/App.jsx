import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './hooks/useWalletAddress';
import { useTokenBalances } from './hooks/useTokenBalances';
import { Token } from './components/Token';
import { useEns } from './hooks/useEns';

const config = {
  apiKey: 'rKu7dXGzGS6arHo9tUNNi4YDtABLCzPT',
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function App() {
  const wallet = useWalletAddress();
  const [userAddress, setUserAddress] = useState('');
  const {
    getTokenBalances,
    isSuccess,
    tokenBalances,
    tokenDataObjects,
    isLoading,
  } = useTokenBalances(userAddress);
  const { address, isEnsFormat } = useEns(userAddress);

  useEffect(() => {
    if (wallet) {
      setUserAddress(wallet);
    }
  }, [wallet]);

  const handleOnClick = async () => {
    await getTokenBalances();
  }

  return (
    <Stack w="100vw" p={4}>
      <Box>
        <Text fontWeight="bold">
          🗂 ERC-20 Token Indexer
        </Text>
      </Box>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading as="h5" p={4}>
          ERC-20 token balances of any address!
        </Heading>
        <Text p={4}>
          Plug in an address and this website will return all of its ERC-20 token balances, it might take a few seconds.
        </Text>
        <Box position="sticky" top={0} backgroundColor="white" textAlign="center" zIndex={999} width="100%">
          <Box pt={5} maxWidth="600px" margin="auto">
            <Input
              onChange={(e) => setUserAddress(e.target.value)}
              color="black"
              textAlign="center"
              maxWidth="700px"
              p={4}
              bgColor="white"
              fontSize={24}
              value={userAddress}
            />
            {isEnsFormat && <Box mt={5}><Code>{address}</Code></Box>}
            <Button leftIcon={<>🔎</>} isLoading={isLoading} size="lg" mt={5} onClick={handleOnClick} colorScheme="blue">
              Check Balances
            </Button>
          </Box>
          <Divider mt={5} />
        </Box>

        {isSuccess && (
          <>
            <Heading as="h2" size="md" mt={5}>ERC-20 token balances</Heading>
            <SimpleGrid w={'90vw'} columns={4} spacing={24} mt={10}>
              {tokenBalances.map((e, i) => {
                return (
                  <Token 
                    key={i}
                    symbol={tokenDataObjects[i].symbol}
                    balance={e.tokenBalance}
                    logo={tokenDataObjects[i].logo}
                    decimals={tokenDataObjects[i].decimals}
                  />
                );
              })}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </Stack>
  );
}

export default App;
