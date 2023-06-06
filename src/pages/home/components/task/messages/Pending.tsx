import styles from '../Task.module.scss'

function PendingMessage () {

    return(
        <div className={styles.pendingMessage}>
            Pending...
        </div>
    )
}

export { PendingMessage }