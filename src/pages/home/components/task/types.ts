export interface Mint {
    transaction_id: number,
    token_metadata: {
      name: string,
      description: string,
      media: string,
      reference: string,
    },
  }