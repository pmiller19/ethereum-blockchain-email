import React from "react";
import InboxEmail from "./inboxEmail";

const Inbox = ({ updateSetOpenEmail }) => {
  const tempEmailList = [...Array(10).keys()];
  const allEmails = tempEmailList.map((num) => {
    return (
      <InboxEmail
        from={"Sender " + num}
        subject={"Subject " + num}
        body={
          " Body of the email is here so we will see how long we can make this before it cuts itself off Body of the email is here so we will see ho long we can make this before it cuts itself off Body of the email is here so we will see how long we can make this before it cuts itself off"
        }
        updateSetOpenEmail={updateSetOpenEmail}
      />
    );
  });
  return (
    <div className='mt-5 border-2 rounded-t-lg'>
      <div className='border-b-2 flex'>
        <p className='text-xl font-semibold mx-2'>Inbox</p>
        <button onClick={() => window.location.reload(false)}>⟳</button>
      </div>

      {allEmails}
    </div>
  );
};

export default Inbox;
