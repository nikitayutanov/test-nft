import { Link } from "react-router-dom";
import { useNFTs } from "hooks/useNFTs";

import styles from "./styles.module.scss";

export function ListNft() {
  const { nfts } = useNFTs();

  return (
    <div className={styles.list}>
      <h1>List Nfts</h1>
      <div className={styles.cards}>
        {nfts?.map((item) => (
          <div key={item.id}>
            <div className={styles.card}>
              <img src={item.media} alt="" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Link to={item.reference} target="_blank">
                Link Reference
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
