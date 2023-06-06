import { createContext, useContext, useState } from 'react';
import styles from './Task.module.scss';
import { MintForm } from './Form';
import {  StageContext } from './types'
import { StageProvider, useStageContext } from './Context';
import { FailMessage, PendingMessage, SuccessMessage } from './messages';

function FormInner () {
        
    const { stage, setStage } = useStageContext();

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
            <div  className={styles.content}>
                <FormInner />
            </div>
        </StageProvider>
    )
}

export { Task }