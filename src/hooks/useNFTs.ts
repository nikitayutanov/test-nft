import { Token } from 'types';
import { useNFTState } from './api';

export const useNFTs = () => {
  const { state, isStateRead } = useNFTState<Token[]>('all_tokens', null);
  return { nfts: state, isNftStateRead: isStateRead };
};
