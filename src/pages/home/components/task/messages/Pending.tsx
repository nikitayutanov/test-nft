import styles from '../Task.module.scss'
import { useStageContext } from '../Context'

function PendingMessage () {

    const { setStage } = useStageContext();

    const GoBack = () => {
        setStage('input')
    }

    return(
       <div className={styles.msgContainer}>
          <div className={styles.pendingMessage}>
              Pending...
          </div>
          <button type="button" className={styles.execBtn.concat(" fail")} onClick={GoBack}>
              Go back
          </button>
       </div>
    )
}

export { PendingMessage }