import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: 'rKu7dXGzGS6arHo9tUNNi4YDtABLCzPT',
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(config);