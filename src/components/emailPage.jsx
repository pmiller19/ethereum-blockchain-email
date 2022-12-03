import React from "react";
import { useNavigate } from "react-router-dom";

const EmailPage = ({ from, subject, body, updateSetOpenEmail }) => {
  const navigate = useNavigate();

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
          <button className='text-xl ml-auto'>↩</button>
        </div>
        {body.split("\n").map((i, key) => {
          return <div key={key}>{i}</div>;
        })}
      </div>
    </div>
  );
};

export default EmailPage;
