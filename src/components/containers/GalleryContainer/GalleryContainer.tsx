import { useEffect, useState } from 'react';
import { GalleryView } from '@/components/views/GalleryView';
import { useNFTState } from '@/hooks/api';
import { NftData } from '@/types';

function GalleryContainer() {
  const { state, isStateRead } = useNFTState<NftData>('all_tokens', null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isStateRead) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isStateRead]);

  return <GalleryView nfts={state || []} isLoading={isLoading} />;
}

export { GalleryContainer };
