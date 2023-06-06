import { ChangeEvent, KeyboardEventHandler, useContext, useState } from 'react';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { GearApi } from '@gear-js/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
import styles from './Task.module.scss';
import { MintFormInputData } from './types';
import { useStageContext } from './Context';
import { NetworkWsUrl, programId } from './consts';

function MintForm () { 

    const FormDefaultInput : MintFormInputData = {
        name: "",
        description: "",
        media: "",
        reference: ""
    }

    const FormInputNames : MintFormInputData = {
        name: "name",
        description: "description",
        media: "media",
        reference: "reference"
    }


    const { stage, setStage } = useStageContext();
    const { account } = useAccount()
    const { api }= useApi()

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
          // console.log(account)
          // console.log(api.provider)

          setStage("pending")

          const gearApi = await GearApi.create({
            providerAddress: NetworkWsUrl,
          });

          // await api.programState.read({ programId: programId }, {});
          
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