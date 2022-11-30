import React from "react";

const EmailPage = ({ from, subject, body, updateSetOpenEmail }) => {
  return (
    <div>
      <div className='flex mb-5'>
        <button
          onClick={() => updateSetOpenEmail("", "", "", false)}
          className='text-xl'
        >
          ←
        </button>
        <p className='text-xl ml-auto mr-auto font-semibold'>{subject}</p>
      </div>
      <div className='max-w-xl ml-auto mr-auto'>
        <div className='flex'>
          <p className='text-lg mb-2'>{"From: " + from}</p>
          <button
            onClick={() => console.log("TODO NEED TO REPLY TO THE ADDRESS")}
            className='text-xl ml-auto'
          >
            ↩
          </button>
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default EmailPage;
