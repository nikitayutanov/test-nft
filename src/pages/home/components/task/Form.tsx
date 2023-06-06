import { ChangeEvent, KeyboardEventHandler, useContext, useState } from 'react';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { GearApi } from '@gear-js/api';
import { useNFTState, useSendNFTMessage } from 'hooks/api';
import styles from './Task.module.scss';
import { Mint, MintFormInputData } from './types';
import { useStageContext } from './Context';
import { FormDefaultInput, FormInputNames, programId } from './consts';

function MintForm () { 

    const { setStage } = useStageContext();
    const { account } = useAccount()
    const { api } = useApi();
    const send = useSendNFTMessage()

    const [FormInput, UpdateFormInput] = useState<MintFormInputData>(FormDefaultInput)

    const WriteInput = (event : ChangeEvent) => {
        const element = event.target as HTMLInputElement
        const val = element.value
        const field : string = element.dataset.field || ""
        const newFormData : MintFormInputData = {
            name: field === FormInputNames.name ? val : FormInput.name,
            description: field === FormInputNames.description ? val : FormInput.description,
            media: field === FormInputNames.media ? val : FormInput.media,
            reference: field === FormInputNames.reference ? val : FormInput.reference
        }
        UpdateFormInput(newFormData)
    }

    const FormValidationFilter = () => {
        if (FormInput.name === FormDefaultInput.name ||
            FormInput.description === FormDefaultInput.description ||
            FormInput.media === FormDefaultInput.media ||
            FormInput.reference === FormDefaultInput.reference ) {
                return false
            }
        
        return true
    }

    const SubmitNftForm = async () => {
          if (!FormValidationFilter()) {
              console.log("invalid data")
              return;
          }
          if (!account) {
              return;
          }

          setStage("pending")

          const msg : Mint = {
            Mint: {
              transaction_id: Math.round(Math.random() * 10000000),
              token_metadata: {
                name: FormInput.name,
                description: FormInput.description,
                media: FormInput.media,
                reference: FormInput.reference,
              },
            },
           }

          try {
              const txn = send(msg)
              const unsub = await api.gearEvents.subscribeToGearEvent(
                'MessageQueued',
                ({ data: { id, source, destination, entry } }) => {

                  if (destination.toHex() === programId) {
                     setStage('success')
                     unsub()
                  }

                  console.log(account.address)

                  console.log({
                    messageId: id.toHex(),
                    programId: destination.toHex(),
                    userId: source
                  });
                },
              );

          } catch (e) {
              console.log(e)
          }
          
    }

    return(
       <div className={styles.mintForm}>
        <h5>
            Name
        </h5>
        <input type="text" 
               data-field={FormInputNames.name} 
               value={FormInput.name} 
               onChange={WriteInput}
               placeholder="Name" />
        <h5>
            Description
        </h5>
        <textarea rows={4} 
                  data-field={FormInputNames.description} 
                  onChange={WriteInput}
                  value={FormInput.description} 
                  placeholder="Description" />
        <h5>
            Media
        </h5>
        <input type="text" 
               data-field={FormInputNames.media}  
               value={FormInput.media} 
               onChange={WriteInput}
               placeholder="Media" />
        <h5>
            Reference
        </h5>
        <input type="text" 
               data-field={FormInputNames.reference}  
               value={FormInput.reference} 
               onChange={WriteInput}
               placeholder="Reference" />
        <h5>
            Sent transaction
        </h5>
        <button className={styles.execBtn} type="button" onClick={SubmitNftForm}>
            Mint
        </button>
      </div>
    )
}

export { MintForm }