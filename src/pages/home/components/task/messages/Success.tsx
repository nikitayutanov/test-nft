import { useState, useEffect } from 'react';
import { useNFTState } from 'hooks/api';
import { useStageContext } from '../Context';
import styles from '../Task.module.scss'
import { FormDefaultInput } from '../consts';
import { MintFormInputData } from '../types';

function SuccessMessage () {

    const { setStage } = useStageContext();
    const [displayNft, setupNft] = useState<MintFormInputData>(FormDefaultInput)
    const [isNftRead, readNft] = useState(false)
    const reader = useNFTState('all_tokens', null)

    useEffect(() => {
         if (reader.state && !isNftRead) {
            
            const sortedState = reader.state.sort((a, b) => {

                if (a.id < b.id) return -1
                if (a.id === b.id) return 0
                if (a.id > b.id) return 1

                return 0
            })

            const nftData = sortedState[reader.state.length - 1]
            
            readNft(true)
            
            setupNft({
                name: String(nftData.name),
                description: String(nftData.description),
                media: String(nftData.media),
                reference: String(nftData.reference)
            })
        } 
    }, [reader, isNftRead])
    
    const GoBack = () => {
        setStage('input')
    }
    
    return(
        <div>
          <div className={styles.pendingMessage}>
            Your new nft : 
          </div>
          <div className={styles.nftContainer}>
              <div className={styles.nftDtItem}>
                {displayNft.name}
              </div>
              <div className={styles.nftDtItem}>
                {displayNft.description}
              </div>
              <div className={styles.nftDtItem}>
                {displayNft.media}
              </div>
              <div className={styles.nftDtItem}>
                {displayNft.reference}
              </div>
          </div>
          <button type="button" className={styles.execBtn} onClick={GoBack}>
              Make a new NFT
          </button>
        </div>
    )
}

export { SuccessMessage }