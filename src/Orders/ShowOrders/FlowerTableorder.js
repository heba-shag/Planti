import { useState } from "react";
import TableOrders from "../../Components/Forms/ClientSide/TableOrders";
import { CgRemove } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { IoMdCheckboxOutline } from "react-icons/io";
import axios from "axios";


export default function FlowerTableOrder(){
    let [orders,setOrders]=useState([]);
    let [filterOrders,setFilterOrders]=useState(orders);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);
    let [runUseEffect,setRun]=useState(0);

    //filter
    let [startDate,setStartDate]=useState("");
    let [endDate,setEndDate]=useState("");

    //edit
    let [isBoughtDate,setIsBoughtDate]=useState(new Date().toISOString());
    let [clients,setClients]=useState([]);
    let [selectedClient,setSelectedClient]=useState("");
    let [orderDate,setOrderDate]=useState(new Date().toISOString());
    let [printConfirmation, setPrintConfirmation] = useState(false);
    let [editConfirmation, setEditConfirmation] = useState(false);
    
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

    const handleEdit = async (id) => {
        setEditId(id);
        setEditConfirmation(true);
    };


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerOrderApi = isDev? {
        baseClientUrl: process.env.REACT_APP_API_CLIENT_URL,
        getAllClient:()=>{return (`${flowerOrderApi.baseClientUrl}/GetAll`)},

        baseUrl: process.env.REACT_APP_API_ORDER_URL,
        deleteOrder:()=>{return (`${flowerOrderApi.baseUrl}/Remove?id=${deleteId}`)},
        UpdateOrderStatus:()=>{return (`${flowerOrderApi.baseUrl}/UpdateOrderStatus?orderId=${editId}&boughtDate=${isBoughtDate}`)},
        UpdateOrder:()=>{return (`${flowerOrderApi.baseUrl}/UpdateOrder`)},
        getAllOrder:()=>{return (`${flowerOrderApi.baseUrl}/GetAll`)},
        
    }:{
        baseClientUrl: process.env.REACT_APP_API_CLIENT_URL,
        getAllClient:()=>{return (`${flowerOrderApi.baseClientUrl}/GetAll`)},

        baseUrl: process.env.REACT_APP_API_ORDER_URL,
        deleteOrder:()=>{return (`${flowerOrderApi.baseUrl}/Remove?id=${deleteId}`)},
        UpdateOrderStatus:()=>{return (`${flowerOrderApi.baseUrl}/UpdateOrderStatus?orderId=${editId}&boughtDate=${isBoughtDate}`)},
        UpdateOrder:()=>{return (`${flowerOrderApi.baseUrl}/UpdateOrder?id=${editId}&boughtDate=${isBoughtDate}`)},
        getAllOrder:()=>{return (`${flowerOrderApi.baseUrl}/GetAll`)},
    }


    async function deleteFlower(id){
        try{
            let res=await axios.delete(flowerOrderApi.deleteOrder());
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
    let handleDateFilter = () => {
        let filteredData;
        if (!startDate && !endDate) {
            setFilterOrders(orders);
            return;
        }
        else if(!endDate){
             filteredData = orders.filter((item) => {
                const itemDate =new Date(item.orderDate);
                const start= new Date(startDate);
                return itemDate>=start;
            });
        }
        else if(!startDate){
            filteredData = orders.filter((item) => {
                const itemDate =new Date(item.orderDate);
                const end= new Date(endDate);
                return itemDate<=end;
            });
        }
        else if(startDate &&endDate) {
            filteredData = orders.filter((item) => {
                const itemDate =new Date(item.orderDate);
                const start= new Date(startDate);
                const end=new Date(endDate);
                return itemDate>=start && itemDate <end;
            });
        }
        setFilterOrders(filteredData);
    }

    //edit
    

    async function Submit(e){
        e.preventDefault();
        try{
                let res=await axios.post(flowerOrderApi.UpdateOrderStatus());
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

    let handleClientChange=(event)=>{
        setSelectedClient(event.target.value);
    }


    async function UpdateSubmit(e){
        // console.log(id);
        e.preventDefault();
        try{
                let res=await axios.post(flowerOrderApi.UpdateOrder(),{
                    id: editId,
                    clientId: parseInt(selectedClient),
                    orderDate: orderDate
                });
                if (res.status===200){
                    setEditConfirmation(false);
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

    const cancelEdit = () => {
        setEditConfirmation(false);
    };
    return(
        <TableOrders
            pageTitle="Çiçek Orders."
            getInfoUrl={flowerOrderApi.getAllClient()}
            setInfoData={setClients}
            infoData={clients}

            getUrl={flowerOrderApi.getAllOrder()}
            setData={setOrders}
            
            Data={orders}
            message={true}

            link="/flowerOreders/OrderNewFlowers"
            linkLabel="Add new Order"
            th={(<tr>
                <th>Order Date</th>
                <th>Number</th>
                <th>Client Name</th>
                <th>is Local?</th>
                <th>is Bought?</th>
                <th>Bought Date</th>
                <th>işlemler</th>
                </tr>)}

            // filtering
            flowerOrderFilter={false}
            setFilterData={setFilterOrders}

            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleDateFilter={handleDateFilter}
           
            filterData={filterOrders.map((dat)=>
                <tr >
                    <td>{new Date(dat.orderDate).toLocaleDateString()}</td>
                    <td>{dat.number}</td>
                    <td>{dat.client.name}</td>
                    <td>{dat.client.isLocal===false?"hayır":"evet"}</td>
                    <td>{dat.isBought===false?"hayır":"evet"}</td>
                    <td>{new Date(dat.boughtDate).toLocaleDateString()}</td>
                    <td ><BiEdit onClick={()=>handleEdit(dat.id)} className='icon'/>
                        <IoMdCheckboxOutline onClick={()=>handlePrint(dat.id)} className='icon'/>
                        <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    </td> 
                </ tr>)}

            //delete
            runUseEffect={runUseEffect}
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFlower}
            showDeletemessage={showDeletemessage}

            //edit
            isBoughtEdit={false}
            orderDate={orderDate}
            updateSubmit={Submit}
            isBoughtDate={isBoughtDate}
            setIsBoughtDate={setIsBoughtDate}
            handlePrint={handlePrint}
            printConfirmation={printConfirmation}
            editConfirmation={editConfirmation}
            updateOrder={UpdateSubmit}
            cancelPrint={cancelPrint}
            cancelEdit={cancelEdit}
            setOrderDate={setOrderDate}
            handleClientChange={handleClientChange}
            showDonemessage={showDonemessage} 


            pagination={false}

        />
    );
}