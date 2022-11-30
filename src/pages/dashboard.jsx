import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectWalletForm from "../components/connectWalletForm";
import Inbox from "../components/inbox";

const Dashboard = () => {
  const navigate = useNavigate();

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
      <Inbox />
    </div>
  );
};

export default Dashboard;
