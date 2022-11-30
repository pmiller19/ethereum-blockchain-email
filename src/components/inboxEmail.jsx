import React from "react";

const InboxEmail = ({ from, subject, body }) => {
  return (
    <div className='border-b-2 bg-gray-100 grid grid-cols-6 py-2 hover:shadow-lg hover:bg-gray-200 cursor-pointer'>
      <p className='ml-2 col-span-1 truncate font-medium'>{from}</p>
      <p className='col-span-5 truncate'>
        {subject}
        <span className='text-gray-600'>{" - " + body}</span>
      </p>
    </div>
  );
};

export default InboxEmail;
