import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectWalletForm from "../components/connectWalletForm";
import EmailPage from "../components/emailPage";
import Inbox from "../components/inbox";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = useState({
    from: "",
    subject: "",
    body: "",
    isOpen: false,
  });

  const updateSetOpenEmail = (from, subject, body, isOpen) => {
    console.log("working");
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
          <ConnectWalletForm />
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
        <Inbox updateSetOpenEmail={updateSetOpenEmail} />
      )}
    </div>
  );
};

export default Dashboard;
