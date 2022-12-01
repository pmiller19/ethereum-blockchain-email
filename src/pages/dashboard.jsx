import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailPage from "../components/emailPage";
import Inbox from "../components/inbox";
import MailLogo from "../assets/mailLogo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useProvider } from "wagmi";
import { useSigner } from "wagmi";
import { useContractRead } from "wagmi";

const Dashboard = () => {
  //#region how to get the wallet address of the sender
  const provider = useProvider();
  const { data: signer } = useSigner();
  //#endregion

  //#region how to read a contract docs here: https://wagmi.sh/react/hooks/useContractRead
  const { data } = useContractRead({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: [
      [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "caretaker",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "CaretakerLoved",
          type: "event",
        },
        {
          inputs: [],
          name: "clean",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "feed",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAlive",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getBoredom",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getHunger",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getSleepiness",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getStatus",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getUncleanliness",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "love",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "play",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "sleep",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    ],
    functionName: "getSleep",
  });
  // can also add args: ["0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"],

  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState({
    from: "",
    subject: "",
    body: "",
    isOpen: false,
  });

  const updateSetOpenEmail = (from, subject, body, isOpen) => {
    console.log(provider);
    // TODO use signer to get the wallet address
    console.log(signer);
    // 0x2c25ed4d5fff54fbe11ca44484d1b6dd2aac0595; wallet address
    console.log(data);
    setOpenEmail({ from: from, subject: subject, body: body, isOpen: isOpen });
  };

  return (
    <div>
      <div className='flex'>
        <button
          onClick={() => navigate("compose")}
          className='border-2 border-gray-100 bg-white shadow hover:shadow-lg text-indigo-500 hover:text-pink-500 px-2 py-2 rounded-lg'
        >
          Compose Email
        </button>
        <div className='ml-auto'>
          <ConnectButton />
        </div>
      </div>
      {openEmail.isOpen ? (
        <EmailPage
          from={openEmail.from}
          subject={openEmail.subject}
          body={openEmail.body}
          updateSetOpenEmail={updateSetOpenEmail}
        />
      ) : (
        <div>
          <Inbox updateSetOpenEmail={updateSetOpenEmail} />
          <div className='text-center'>
            <img className='mt-48 h-16 w-auto ml-auto mr-auto' src={MailLogo} />
            <p className='text-xs font-light mt-2'>
              The best solution for safe and secure emails.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
