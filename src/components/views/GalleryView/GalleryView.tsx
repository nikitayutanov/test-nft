import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cx, deepEqualProps } from '@/utils';
import styles from './GalleryView.module.scss';
import { GalleryViewProps } from './GalleryView.interfaces';
import { Loader } from '@/components/loaders';

function GalleryViewComponent({ nfts, isLoading }: GalleryViewProps) {
  return (
    <div className={cx(styles.container)}>
      {isLoading ? (
        <Loader />
      ) : (
        nfts.map(({ id, media, name, description, reference }) => (
          <div key={id} className={cx(styles.card)}>
            <div className={cx(styles['image-wrapper'])}>
              <div className={cx(styles.dummy)} />
              <img src={media} alt="" className={cx(styles.image)} />
            </div>
            <div className={cx(styles.content)}>
              <h4>{name}</h4>
              <p>{description}</p>
              <Link to={reference} target="_blank" className={cx(styles.reference)}>
                Go to reference
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const GalleryView = memo(GalleryViewComponent, deepEqualProps);

export { GalleryView };
