import { useState } from "react";
import { Button, Input } from "@gear-js/ui";

import { useSendNFTMessage } from "hooks/api";
import { useAccount } from "@gear-js/react-hooks";

import styles from "./styles.module.scss";
import { TextAnimation } from "./TextDropAnimation";

const NftInitialState = {
  title: "",
  description: "",
  media: "",
  reference: "",
};

export function CreateNft() {
  const [nftForm, setNftForm] = useState(NftInitialState);
  const { title, description, media, reference } = nftForm;
  const [hiddenSuccess, setHiddenSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNftForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const { account } = useAccount();
  const sendMessage = useSendNFTMessage();

  const sendCreateNft = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tokenMetadata = {
      name: title,
      description,
      media,
      reference,
    };

    const payload = {
      Mint: {
        transaction_id: Math.floor(Math.random() * 100),
        to: account?.decodedAddress,
        tokenMetadata,
      },
    };

    sendMessage(payload, {
      onSuccess: () => {
        setNftForm(NftInitialState);
        setHiddenSuccess(true);
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  return (
    <div>
      {hiddenSuccess && <TextAnimation />}
      <h2>Create NFT</h2>
      <form onSubmit={sendCreateNft}>
        <div className={styles.form}>
          <Input
            label="Name"
            required
            className={styles.input}
            name="title"
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            label="Description"
            required
            className={styles.input}
            name="description"
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            label="Image"
            required
            className={styles.input}
            name="media"
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            label="Reference"
            required
            className={styles.input}
            name="reference"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <Button type="submit" text="Create" />
      </form>
    </div>
  );
}
