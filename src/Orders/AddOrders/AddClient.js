import { useState } from "react";
import OrderForm from "../../Components/Forms/ClientSide/OrderForm";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from "axios";

export default function AddClient(){
    let [clientName,setClientName]=useState("");
    let [selectedIsLocal,setSelectedIsLocal]=useState("");
    let [valuePhoneField,setValuePhoneField]=useState("");
    let [phoneNumber,setPhoneNumber]=useState("");
    let [callingNumber,setCallingNumber]=useState(""); 
    
    let [errorMessage,setErrorMessage]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const clientApi = isDev? {
      baseUrl: process.env.REACT_APP_API_CLIENT_URL,
      addClient:()=>{return (`${clientApi.baseUrl}/Add`)},
    }:{
      baseUrl: process.env.REACT_APP_API_CLIENT_URL,
      addClient:()=>{return (`${clientApi.baseUrl}/Add`)},
    }


    let handleIsLocalChange=(event)=>{
        setSelectedIsLocal(event.target.value);
    }

    const handlePhoneNumber = (value) => {
        if (!value) {
            setCallingNumber('');
            setPhoneNumber('');
            return;
          }
        const phone = parsePhoneNumberFromString(value);
        if (phone) {
          setCallingNumber(phone.countryCallingCode);
          setPhoneNumber(phone.nationalNumber);
        } else {
          // التعامل مع الحالات التي لا تتطابق مع النمط
          console.error('Invalid phone number format');
        }
        setValuePhoneField(value);
      };

    return(
        <OrderForm
        title="new Client"

        direction={`/clients`}
        newClientForm={false}
        
        AddOrderUrl={clientApi.addClient()}
        orderDetails={{
            name: clientName,
            isLocal: selectedIsLocal===true?true:false,
           phoneNumber: phoneNumber,
           codePhoneNumber:callingNumber
        }}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}

        //newClient
        addClientName={clientName}
        setClientName={setClientName}
        // addClientName={newClient}
        addSelectedIsLocal={selectedIsLocal}
        handleIsLocalChange={handleIsLocalChange}
        addValuePhoneField={valuePhoneField}
        handlePhoneNumber={handlePhoneNumber}
        setValuePhoneField={setValuePhoneField}


        button="Add new Client"
        />
        
    );
}