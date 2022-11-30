import React from "react";
import ConnectWalletForm from "../components/connectWalletForm";
import Header from "../components/header";
import Inbox from "../components/inbox";

const Dashboard = () => {
  return (
    <div className='my-10 mx-10'>
      <Header />
      <div className='mt-5 flex'>
        <button className='border-2 border-gray-100 bg-white shadow hover:shadow-lg text-indigo-500 hover:text-pink-500 px-2 py-2 rounded-lg'>
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
