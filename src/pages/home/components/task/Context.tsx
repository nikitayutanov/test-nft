import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import {  FormPendingState, StageContext } from './types'

interface FormContextProviderProps extends PropsWithChildren<{}> { }

const FormContext = createContext<StageContext | null>(null)

export const useStageContext = (): StageContext => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('Form stage context not found');
    }
    return context;
  };

export function StageProvider ({ children } : FormContextProviderProps) {
    const [stage, setStage] = useState<FormPendingState>("input")

    const contextValue: StageContext = useMemo(() => ({
        stage,
        setStage,
      }), [stage]);

    return(
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    )
}
