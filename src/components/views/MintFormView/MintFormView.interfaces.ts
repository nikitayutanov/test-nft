import { ChangeEvent, FormEvent } from 'react';

export interface FormValues {
  [key: string]: string;
}

export interface MintFormViewProps {
  formValues: FormValues;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
