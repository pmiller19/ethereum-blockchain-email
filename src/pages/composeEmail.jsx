import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useSigner,
  useSignMessage,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import sorceryMailAbi from "../constants/sorceryMailAbi";
import { smartContractAddress } from "../constants/smartContractAddress";
import moment from "moment";
import { verifyMessage } from "ethers/lib/utils.js";
import CryptoJS from "crypto-js";

const ComposeEmail = () => {
  const navigate = useNavigate();
  // const { from } = navigate.state;

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const { data: signer } = useSigner();

  // TODO add something for if it is a success (maybe a useEffect that displays a message and sends the user back to dashboard)
  const { config, status } = usePrepareContractWrite({
    address: smartContractAddress,
    abi: sorceryMailAbi,
    functionName: "store",
    args: [recipient, subject, ciphertext, moment().format()],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    setRecipient("");
    setSubject("");
    setBody("");
    setCiphertext("");
  }, [isSuccess]);

  useEffect(() => {
    setDisabledButton(
      !recipient || !subject || !body || !write || isLoading || !signer || status === "loading"
    );
    // console.log(signer?._address);
    // console.log(moment().format("MMM Do"));
  }, [recipient, subject, body, write, isLoading]);

  // const { data: signedData, error, signIsLoading, signMessage } = useSignMessage({
  //   onSuccess(data, variables) {
  //     // Verify signature when sign message succeeds
  //     const address = verifyMessage(variables.message, data)
  //     console.log('enc data: ', data, variables);
  //     console.log('recovered addy: ', address);
  //   },
  // })

  useEffect(() => {
    const ciphertext = CryptoJS.AES.encrypt(body, recipient).toString();
    setCiphertext(ciphertext);
  }, [body])

  const submit = () => {
    // signMessage({message: body});

    

    // console.log(ciphertext);
    // const bytes = CryptoJS.AES.decrypt(ciphertext, recipient);
    // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData);

    console.log(body);
    console.log(ciphertext);
    console.log(config);


    write();
  }

  return (
    <div>
      <div className='flex mb-5'>
        <div className='ml-auto'>
          <ConnectButton />
        </div>
      </div>
      <div className='flex'>
        <button onClick={() => navigate("/")} className='text-xl'>
          ←
        </button>
        <div className='ml-auto mr-auto text-center'>
          <p className='text-xl font-semibold'>New Message</p>
          {!signer ? (
            <p className='text-red-500'>
              *Please connect your wallet before attempting to send email
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className='py-8'>
        <form action='#' className='space-y-8'>
          <div>
            <label
              for='walletAddress'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Recipient
            </label>
            <input
              type='text'
              id='walletAddress'
              className='shadow-sm border border-gray-300 bg-gray-50 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5'
              placeholder='0xb794f5ea0ba39494ce839613fffba74279579268'
              onChange={(event) => setRecipient(event.target.value)}
              value={recipient}
              required
            />
          </div>
          <div>
            <label
              for='subject'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              className='block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500'
              placeholder='Subject'
              onChange={(event) => setSubject(event.target.value)}
              value={subject}
              required
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              for='message'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Body
            </label>
            <textarea
              id='message'
              rows='6'
              className='block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-gray-500'
              placeholder='Message'
              onChange={(event) => setBody(event.target.value)}
              value={body}
              required
            ></textarea>
          </div>
          <button
            type='submit'
            disabled={disabledButton}
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
            className={`border-2 border-gray-100 rounded-lg px-2 py-2 shadow " +
              ${
                !disabledButton
                  ? "bg-white hover:shadow-lg text-indigo-500 hover:text-pink-500"
                  : "bg-gray-100 text-black "
              }`}
          >
            {isLoading ? "Sending Email..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;
