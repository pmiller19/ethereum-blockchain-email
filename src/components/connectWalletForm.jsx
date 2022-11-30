import React from "react";

const ConnectWalletForm = () => {
  return (
    <form class='w-full max-w-sm'>
      <div class='flex items-center border-b border-teal-500 py-2'>
        <input
          class='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Wallet address'
          aria-label='Full name'
        />
        <button
          class='flex-shrink-0 bg-indigo-500 hover:bg-pink-500 border-indigo-500 hover:border-pink-500 text-sm border-4 text-white py-1 px-2 rounded transition animate ease-in-out delay-250 duration-300'
          type='button'
        >
          Connect Wallet
        </button>
        <button
          class='flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-pink-600 text-sm py-1 px-2 rounded'
          type='button'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ConnectWalletForm;
