import stateMetaWasm from 'assets/meta/state.meta.wasm';
import metaTxt from 'assets/meta/meta.txt';
import { useReadWasmState, useSendMessage } from '@gear-js/react-hooks';
import { ADDRESS } from 'consts';
import { AnyJson } from '@polkadot/types/types';
import { useMetadata, useWasmMetadata } from './useMetadata';

function useNFTMetadata() {
  return useMetadata(metaTxt);
}

function useNFTState<T>(functionName: string, payload: AnyJson) {
  const { buffer } = useWasmMetadata(stateMetaWasm);

  return useReadWasmState<any[]>(ADDRESS.CONTRACT, buffer, functionName, payload);
}

function useSendNFTMessage() {
  const meta = useNFTMetadata();

  return useSendMessage(ADDRESS.CONTRACT, meta);
}

export { useNFTState, useSendNFTMessage };