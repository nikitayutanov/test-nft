import { useStageContext } from '../Context';
import styles from '../Task.module.scss';

function FailMessage () {
    
    const { setStage } = useStageContext();

    const GoBack = () => {
        setStage('input')
    }

    return(
       <div>
        <div className={styles.pendingMessage}>
          Fail
        </div>
        <button type="button" className={styles.execBtn} onClick={GoBack}>
            Go back
        </button>
      </div>
    )
}

export { FailMessage }
