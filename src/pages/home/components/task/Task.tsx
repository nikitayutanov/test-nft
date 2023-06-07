import styles from './Task.module.scss';
import { MintForm } from './Form';
import { StageProvider, useStageContext } from './Context';
import { FailMessage, PendingMessage, SuccessMessage } from './messages';

function FormInner () {

    /* 
        Screen depends on form stage: form or message with result
    */
        
    const { stage } = useStageContext();

    switch (stage) {
        case "input" :
            return <MintForm />
        case "pending" :
            return <PendingMessage />
        case "fail" : 
            return <FailMessage />
        case "success" : 
            return <SuccessMessage />
        default :
            return <MintForm />
    }
}

function Task () {

    return(
        <StageProvider>
            <div className={styles.content}>
                <FormInner />
            </div>
        </StageProvider>
    )
}

export { Task }