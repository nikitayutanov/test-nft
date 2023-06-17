import { ChangeEvent, FormEvent, useState } from 'react';
import { MintFormView } from '@/components/views/MintFormView';
import { useSendNFTMessage } from '@/hooks/api';
import { MintFormValues } from './MintFormContainer.interfaces';

function MintFormContainer() {
  const [formValues, setFormValues] = useState<MintFormValues>({
    name: '',
    description: '',
    media: '',
    reference: '',
  });
  const sendMessage = useSendNFTMessage();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mintToken = async (values: MintFormValues): Promise<void> => {
    const payload = {
      Mint: {
        transaction_id: Math.floor(Math.random() * (99999 - 10000)) + 10000,
        token_metadata: values,
      },
    };

    sendMessage(payload, {
      onSuccess: () => {
        setFormValues({
          name: '',
          description: '',
          media: '',
          reference: '',
        });
      },
      onError: () => {
        throw new Error('error');
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mintToken(formValues);
  };

  return <MintFormView formValues={formValues} onChange={handleChange} onSubmit={handleSubmit} />;
}

export { MintFormContainer };
