export interface NftCard {
  id: string;
  name: string;
  description: string;
  media: string;
  reference: string;
}

export interface GalleryViewProps {
  nfts: NftCard[];
  isLoading: boolean;
}
