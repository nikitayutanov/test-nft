export type InputNames = "name" | "description" | "metadata"

export type FormPendingState = "input" | "pending" | "success" | "fail"

export interface Mint {
    transaction_id: number,
    token_metadata: {
      name: string,
      description: string,
      media: string,
      reference: string,
    },
  }

export interface MintFormInputData {
    name: string,
    description: string,
    metadata: string
}

export interface StageContext {
  stage: FormPendingState;
  setStage: (newStage: FormPendingState) => void;
}


