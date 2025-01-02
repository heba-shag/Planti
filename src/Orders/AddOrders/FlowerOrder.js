import { useState } from "react";
import OrderForm from "../../Components/Forms/ClientSide/OrderForm";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from "axios";

export default function FlowerOrder(){
    let [flowersDetails,setFlowersDetails]=useState([]);
    let [flowerCode,setFlowerCode]=useState("");
    let [clientData,setClientData]=useState([]);
    let [clientId,setClientId]=useState(0);
    let [orderDate,setOrderDate]=useState(new Date().toISOString().slice(0, 16));
    let [reciveDate,setReciveDate]=useState(new Date().toISOString());
    let [isBought,setIsBought]=useState("");
    let [count,setCount]=useState(0);
    let [long,setLong]=useState(0);
    let [mix,setMix]=useState([]);
    let [errorMessage,setErrorMessage]=useState("");

    // newclient
    let [clientName,setClientName]=useState("");
    let [newClient,setNewClient]=useState(false);
    let [isSubmitted,setIsSubmitted]=useState(false);
    let [selectedIsLocal,setSelectedIsLocal]=useState("");
    let [valuePhoneField,setValuePhoneField]=useState("");
    let [phoneNumber,setPhoneNumber]=useState("");
    let [callingNumber,setCallingNumber]=useState(""); 
    let [accept,setAccept]=useState(false);


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerOrderApi = isDev? {
        baseClientUrl: process.env.REACT_APP_API_CLIENT_URL,
        addClient:()=>{return (`${flowerOrderApi.baseClientUrl}/Add`)},
        getAllClient:()=>{return (`${flowerOrderApi.baseClientUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlower:()=>{return (`${flowerOrderApi.baseFlowerUrl}/GetAllFlowerStore?pageSize=1000000000&pageNum=0`)},

        baseOrderUrl: process.env.REACT_APP_API_ORDER_URL,
        addOrder:()=>{return (`${flowerOrderApi.baseOrderUrl}/Add`)} 
        
    }:{
        baseClientUrl: process.env.REACT_APP_API_CLIENT_URL,
        addClient:()=>{return (`${flowerOrderApi.baseClientUrl}/Add`)},
        getAllClient:()=>{return (`${flowerOrderApi.baseClientUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlower:()=>{return (`${flowerOrderApi.baseFlowerUrl}/GetAllFlowerStore?pageSize=1000000000&pageNum=0`)},

        baseOrderUrl: process.env.REACT_APP_API_ORDER_URL,
        addOrder:()=>{return (`${flowerOrderApi.baseOrderUrl}/Add`)}  
    }


    let handleIsBoughtChange=(event)=>{
        setIsBought(event.target.value);
    }

    let handleFlowerCodeChange=(event)=>{
        setFlowerCode(event.target.value);
    }

    let handleClientIdChange=(event)=>{
        setClientId(event.target.value);
    }

    let handleFlowerOrders=( )=>{
        // let longInt=parseInt(long);
        // let countInt=parseInt(count);
        if (long && count && flowerCode) {
            setMix([...mix, { long:parseInt(long),count:parseInt(count), code: flowerCode }]);
            setFlowerCode("");
            setCount(0);
            setLong(0);
        }
    }

    //newClient
    let handleIsLocalChange=(event)=>{
        setSelectedIsLocal(event.target.value);
    }

    let handleAdd = async () => {
        setNewClient(true);
        
    };

    let handleCancel=async()=>{
        setNewClient(false);
    }

    const handlePhoneNumber = (value) => {
        if (!value) {
            setCallingNumber('');
            setPhoneNumber('');
            return;
          }
        const phone = parsePhoneNumberFromString(value);
        console.log(phone);
        if (phone) {
          setCallingNumber(phone.countryCallingCode);
          setPhoneNumber(phone.nationalNumber);
        } else {
          // التعامل مع الحالات التي لا تتطابق مع النمط
          console.error('Invalid phone number format');
        }
        setValuePhoneField(value);
      };


      async function Submit(e){
        let flag=true;
        e.preventDefault();
        setAccept(true);

        if(clientName===""||valuePhoneField===""||selectedIsLocal===""){
            flag=false;
        }else flag=true;
        try{
            if(flag){
            
            let res=await axios.post(flowerOrderApi.addClient(),{
                isLocal: selectedIsLocal===true?true:false,
                name: clientName,
                phoneNumber: phoneNumber,
                codePhoneNumber:callingNumber
            }
            );   
            if(res.status===200){
                console.log(res.data);
            setClientId(res.data);
            setIsSubmitted(true);
            }
                
        }}catch(error){
            console.log("err.response.errorMessageDetails");
        }
    }



    return(
        <OrderForm
        errorHatalı={false}
        isPendingindir={false}
        title="your Order"
        getProductlsUrl={flowerOrderApi.getAllFlower()}
        setProductData={setFlowersDetails}
        flowerDetails={flowersDetails}
        getClientsUrl={flowerOrderApi.getAllClient()}
        setClientData={setClientData}
        clientData={clientData}

        direction={`/flowerOreders`}
        OrderDefault={false}
        flowersOrder={false}
        orderDate={orderDate}
        setOrderDate={setOrderDate}
        reciveDate={reciveDate}
        setReciveDate={setReciveDate}
        clientId={clientId}
        handleClientIdChange={handleClientIdChange}
        count={count}
        setCount={setCount}
        long={long}
        setLong={setLong}
        flowerCode={flowerCode}
        handleFlowerCodeChange={handleFlowerCodeChange}
        isBought={isBought}
        handleIsBoughtChange={handleIsBoughtChange}
        mix={mix}
        setMix={setMix}
        handleFlowerOrders={handleFlowerOrders}

        AddOrderUrl={flowerOrderApi.addOrder()}
        orderDetails={{
            // number:"564",
            isBought:isBought===true?true:false,
            clientId: parseInt(clientId),
            orderDate: orderDate,
            boughtDate: reciveDate,
            flowerOrderDetails: mix
        }}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}

        //newClient
        clientName={clientName}
        setClientName={setClientName}
        accept={accept}
        newClient={newClient}
        handleAdd={handleAdd}
        isSubmitted={isSubmitted}
        handleCancel={handleCancel}
        selectedIsLocal={selectedIsLocal}
        handleIsLocalChange={handleIsLocalChange}
        valuePhoneField={valuePhoneField}
        handlePhoneNumber={handlePhoneNumber}
        setValuePhoneField={setValuePhoneField}
        submit={Submit}


        button="Add the order"
        // flowersOrder={false}
        />
        
    );
}