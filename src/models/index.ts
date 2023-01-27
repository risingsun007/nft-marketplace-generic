interface Nft {
  doMint: ((id: number, web3ReactHook: any) => Promise<any>)
  getTokenBalances: ((numTokens: number) => Promise<number[]>) | null
  nftCost: number;
};

interface Wallet {
  connect: ((web3ReactHook: any) => Promise<void>)
  disconnect: ((web3ReactHook: any) => Promise<void>)
};

interface NftData {
  name: string;
  description: string;
  source: string;
}

export { Nft, Wallet };