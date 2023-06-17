import { Button, Input } from '@gear-js/ui';
import { cx } from '@/utils';
import styles from './MintFormView.module.scss';
import { MintFormViewProps } from './MintFormView.interfaces';

function MintFormView({ formValues, onChange, onSubmit }: MintFormViewProps) {
  return (
    <form onSubmit={onSubmit} className={cx(styles.form)}>
      {Object.keys(formValues).map((key) => (
        <Input
          key={key}
          label={key}
          name={key}
          value={formValues[key]}
          onChange={onChange}
          className={cx(styles.input)}
          required
        />
      ))}
      <Button type="submit" text="Mint NFT" className={styles.button} />
    </form>
  );
}

export { MintFormView };
