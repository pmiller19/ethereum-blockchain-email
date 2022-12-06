import React, { useEffect, useState } from "react";
import InboxEmail from "./inboxEmail";
import { useSigner } from "wagmi";
import { useContractRead } from "wagmi";
import sorceryMailAbi from "../constants/sorceryMailAbi";
import { smartContractAddress } from "../constants/smartContractAddress";
import moment from "moment";

const Inbox = ({ updateSetOpenEmail }) => {
  const [reformattedData, setReformattedData] = useState([]);
  const { data: signer } = useSigner();

  const { data } = useContractRead({
    address: smartContractAddress,
    abi: sorceryMailAbi,
    functionName: "retrieveAll",
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      let tempData = [];
      for (let i = 0; i < data[0]?.length; i++) {
        console.log("Name", data[0][i]);
        let recipient = data[1][i];
        if (recipient === signer?._address) {
          console.log(recipient);
          console.log(signer?._address);
          let emailFields = {
            from: data[0][i],
            subject: data[2][i],
            body: data[3][i],
            timeStamp: data[4][i],
          };
          console.log("DATAAATATATA", moment(data[4][i]).format("MMM D"));
          tempData.push(emailFields);
        }
      }

      tempData.sort((a, b) => a.timeStamp < b.timeStamp);
      setReformattedData(tempData);
    }
  }, [data, signer]);

  const allEmails = reformattedData.map((emailObj) => {
    return (
      <InboxEmail
        from={emailObj.from}
        subject={emailObj.subject}
        body={emailObj.body}
        timeStamp={moment(emailObj.timeStamp).format("MMM D")}
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
      {/* {allEmails} */}
      {!signer ? (
        <div className='mt-10 mb-10 flex'>
          <p className='text-gray-400 text-xl ml-auto mr-auto'>
            No Data, Please Connect Wallet
          </p>
        </div>
      ) : (
        allEmails
      )}
    </div>
  );
};

export default Inbox;
