import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";

export function Token ({ symbol, balance, logo, decimals }) {
  return (
    <Flex>
      <Avatar src={logo} />
      <Box ml='3'>
        <Text fontWeight='bold'>
          Token Symbol:
          <Badge ml='1' colorScheme='green'>
            {symbol}
          </Badge>
        </Text>
        <Text fontSize='sm' noOfLines={1} wordBreak="break-all">
          <strong>Balance:</strong> {Utils.formatUnits(balance, decimals)}
        </Text>
      </Box>
    </Flex>
  );
}