import { TabPanel } from '@/components/shared/tab-panel';
import { MintFormContainer } from '@/components/containers/MintFormContainer';
import { GalleryContainer } from '@/components/containers/GalleryContainer';

const tabsConfig = {
  addNft: {
    name: 'Add NFT',
    component: () => <MintFormContainer />,
    icon: '',
  },
  myNfts: {
    name: 'My NFTs',
    component: () => <GalleryContainer />,
    icon: '',
  },
};

function Home() {
  return <TabPanel tabs={tabsConfig} />;
}

export { Home };
