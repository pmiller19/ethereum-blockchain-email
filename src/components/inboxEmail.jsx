import React from "react";

const InboxEmail = ({ from, subject, body, timeStamp, updateSetOpenEmail }) => {
  return (
    <div
      onClick={() => updateSetOpenEmail(from, subject, body, true)}
      className='border-b-2 bg-gray-100 grid grid-cols-12 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer'
    >
      <p className='ml-2 col-span-2 truncate font-medium'>{from}</p>
      <p className='col-span-9 truncate'>
        {subject}
        <span className='text-gray-600'>{" - " + body}</span>
      </p>
      <p className='col-span-1 ml-auto mr-2'>{timeStamp}</p>
    </div>
  );
};

export default InboxEmail;
