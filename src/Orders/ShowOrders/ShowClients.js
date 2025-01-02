import { useState } from "react";
import TableOrders from "../../Components/Forms/ClientSide/TableOrders";
import { CgRemove } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import axios from "axios";


export default function ShowClients(){
    let [clients,setClients]=useState([]);
    let [filterClients,setFilterClients]=useState(clients);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);
    let [runUseEffect,setRun]=useState(0);

    //filter
    let [clientName,setClientName]=useState("");

    //edit
    let [isBoughtDate,setIsBoughtDate]=useState(new Date().toISOString());
    let [printConfirmation, setPrintConfirmation] = useState(false);
    let [showDonemessage,setShowPrintDone]=useState(false);
    let [editId,setEditId]=useState("");

    //delete
    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };

    const handlePrint = async (id) => {
        setEditId(id);
        setPrintConfirmation(true);
    };

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const clientApi = isDev? {
        baseUrl: process.env.REACT_APP_API_CLIENT_URL,
        deleteClient:()=>{return (`${clientApi.baseUrl}/Remove?id=${deleteId}`)},
        updateClient:()=>{return (`${clientApi.baseUrl}/UpdateOrderStatus?orderId=${editId}&boughtDate=${isBoughtDate}`)},
        getAllClient:()=>{return (`${clientApi.baseUrl}/GetAll`)},
        
    }:{
        baseUrl: process.env.REACT_APP_API_CLIENT_URL,
        deleteClient:()=>{return (`${clientApi.baseUrl}/Remove?id=${deleteId}`)},
        updateClient:()=>{return (`${clientApi.baseUrl}/UpdateOrderStatus?orderId=${editId}&boughtDate=${isBoughtDate}`)},
        getAllClient:()=>{return (`${clientApi.baseUrl}/GetAll`)},
    }

    async function deleteClient(id){
        try{
            let res=await axios.delete(clientApi.deleteClient());
            if(res.status===200){
                setDeleteConfirmation(false);
                setRun((prev)=>prev+1);
                setShowDeleted(true); // Show success message
                setTimeout(() => setShowDeleted(false), 1500); 
            }
        }catch{
            console.log("none");
        }
    }

    const cancelDelete = () => {
        setDeleteConfirmation(false);
    };


    //filter
    let handleNameSelectedChange=(selectedName)=>{
        setClientName(selectedName);
        console.log(selectedName);
        if (!selectedName) {
            setFilterClients(clients);
            return;
        }
        console.log(clients);
        console.log(clientName);

        const filteredData = clients.filter((item) => (selectedName.label === item.name));
        // console.log(filteredData);
        setFilterClients(filteredData);
        }

        console.log(filterClients);
    //edit
    

    async function Submit(e){
        e.preventDefault();
        try{
                let res=await axios.post(clientApi.updateClient());
                if (res.status===200){
                    setPrintConfirmation(false);
                    setRun((prev)=>prev+1);
                    setShowPrintDone(true);
                    setTimeout(() => setShowPrintDone(false), 2000);
                    
                }
        }catch(error){
            console.log("err.response.errorMessageDetails");
        }
    }

    const cancelPrint = () => {
        setPrintConfirmation(false);
    };

    
    return(
        <TableOrders
            pageTitle="Clients Information."
            getUrl={clientApi.getAllClient()}
            setData={setClients}
            
            Data={clients}
            message={true}

            link="/clients/addNewClient"
            linkLabel="Add new Client"
            th={(<tr>
                <th>Client Name</th>
                <th>is Local?</th>
                <th>Country Calling Code</th>
                <th>Client Phone Number</th>
                <th>işlemler</th>
                </tr>)}

            // filtering
            clientsFilter={false}
            setFilterData={setFilterClients}
            selectedNameOption={clientName}
            setSelectedNameOption={setClientName}
            handleNameSelectedChange={handleNameSelectedChange}
           
            filterData={filterClients.map((dat)=>
                <tr >
                    <td>{dat.name}</td>
                    <td>{dat.isLocal===false?"hayır":"evet"}</td>
                    <td>{dat.codePhoneNumber}</td>
                    <td>{dat.phoneNumber}</td>
                    <td > <BiEdit onClick={()=>handlePrint(dat.id)} className='icon'/>
                        <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    </td> 
                </ tr>)}

            //delete
            runUseEffect={runUseEffect}
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteClient}
            showDeletemessage={showDeletemessage}

            //edit
            isBoughtEdit={false}
            updateSubmit={Submit}
            isBoughtDate={isBoughtDate}
            setIsBoughtDate={setIsBoughtDate}
            handlePrint={handlePrint}
            printConfirmation={printConfirmation}
            cancelPrint={cancelPrint}
            showDonemessage={showDonemessage}


            pagination={false}

        />
    );
}