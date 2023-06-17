import { GalleryView } from '@/components/views/GalleryView';
import { useNFTState } from '@/hooks/api';
import { NftData } from '@/types';

function GalleryContainer() {
  const { state } = useNFTState<NftData>('all_tokens', null);

  return <GalleryView nfts={state || []} />;
}

export { GalleryContainer };
