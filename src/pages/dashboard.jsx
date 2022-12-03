import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailPage from "../components/emailPage";
import Inbox from "../components/inbox";
import MailLogo from "../assets/mailLogo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import sorceryMailAbi from "../constants/sorceryMailAbi";
import { smartContractAddress } from "../constants/smartContractAddress";

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
    address: smartContractAddress,
    abi: sorceryMailAbi,
    functionName: "retrieveAll",
  });

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
    console.log("Email data: ", data);
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
          <Inbox updateSetOpenEmail={updateSetOpenEmail} data={data} />
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
