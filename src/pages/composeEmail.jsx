import React from "react";
import { useNavigate } from "react-router-dom";

const ComposeEmail = () => {
  const navigate = useNavigate();

  return (
    <div className=''>
      <div className='flex'>
        <button onClick={() => navigate(-1)} className='text-xl'>
          ←
        </button>
        <p className='text-lg ml-auto mr-auto font-semibold'>New Message</p>
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
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='border-2 border-gray-100 bg-white shadow hover:shadow-lg text-indigo-500 hover:text-pink-500 px-2 py-2 rounded-lg'
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;
