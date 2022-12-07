import React, { useEffect, useState } from "react";
import InboxEmail from "./inboxEmail";
import { useSigner } from "wagmi";
import { useContractRead } from "wagmi";
import sorceryMailAbi from "../constants/sorceryMailAbi";
import { smartContractAddress } from "../constants/smartContractAddress";
import moment from "moment";
import CryptoJS from "crypto-js";

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
        const timestamp = moment(data[4][i]);
        if (recipient === signer?._address && timestamp.isAfter(moment("12/05/2022"))) {
          console.log(recipient);
          console.log(signer?._address);
          const ciphertext = data[3][i];
          const bytes = CryptoJS.AES.decrypt(ciphertext, recipient);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          let emailFields = {
            from: data[0][i],
            subject: data[2][i],
            body: decryptedData,
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
