import React, { useEffect, useState } from "react";
import InboxEmail from "./inboxEmail";
import { useSigner } from "wagmi";

const Inbox = ({ updateSetOpenEmail, data }) => {
  const [reformattedData, setReformattedData] = useState([]);
  const { data: signer } = useSigner();

  useEffect(() => {
    console.log(data);
    if (data) {
      let tempData = [];
      for (let i = 0; i < data[0]?.length; i++) {
        console.log("Name", data[0][i]);
        let recipient = data[1][i];
        if (recipient === signer._address) {
          console.log(recipient);
          console.log(signer._address);
          let emailFields = {
            from: data[0][i],
            subject: data[2][i],
            body: data[3][i],
            timeStamp: data[4][i],
          };
          tempData.push(emailFields);
        }
      }
      setReformattedData(tempData);
    }
  }, []);

  const allEmails = reformattedData.map((emailObj) => {
    return (
      <InboxEmail
        from={emailObj.from}
        subject={emailObj.subject}
        body={emailObj.body}
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
