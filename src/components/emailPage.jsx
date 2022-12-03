import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const EmailPage = ({ from, subject, body, updateSetOpenEmail }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

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
          <CopyToClipboard text={from} onCopy={() => setCopied(true)}>
            <button
              className={`mb-2 ml-1 ${
                !copied ? " text-blue-500 hover:underline" : " cursor-auto"
              }`}
            >
              {copied ? "✓" : "Copy"}
            </button>
          </CopyToClipboard>
          <button
            onClick={() => navigate("compose")}
            className='text-xl ml-auto'
          >
            ↩
          </button>
        </div>
        {body.split("\n").map((i, key) => {
          return <div key={key}>{i}</div>;
        })}
      </div>
    </div>
  );
};

export default EmailPage;
