export interface Nft {
  id: string;
  name: string;
  description: string;
  media: string;
  reference: string;
}

export type NftData = Nft[];
