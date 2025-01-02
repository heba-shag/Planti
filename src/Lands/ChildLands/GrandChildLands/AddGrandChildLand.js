import { useEffect, useState } from 'react'; 
import AddForm from '../../../Components/Forms/AddForm';

export default function AddGrandChildLand(){

  // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  const addLandApi = isDev? {

    baseUrl: process.env.REACT_APP_API_LAND_URL,
    addLand:()=>{return (`${addLandApi.baseUrl}/Add`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_LAND_URL,
    addLand:()=>{return (`${addLandApi.baseUrl}/Add`)} 
  }

  let [isPending,setIsPending]=useState(true);
  let [error,setError]=useState("");

  let [parentTitle,setParentTitle]=useState("");
  let [parentSize,setParentSize]=useState("");
  let [parentId,setParentId]=useState("");
  let [title,setTitle]=useState("");
  let [size,setSize]=useState(0);
  let [location,setLocation]=useState("");

  const parentLinkId=window.location.pathname.split("/").slice(-4)[0];
  const id=window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    fetch(`http://cultivation.runasp.net/api/Land/GetById?id=${id}`)
    .then((res)=>{
      if(!res.ok){
          throw Error("couldn't fetch data for that resource" )
      }
      return  res.json();
  })
    .then((data)=>{
      console.log(data.id);
      setParentSize(data.size);
      setParentId(data.id);
      setIsPending(false);
      setError("");
    })
    .catch(err=>{
      setIsPending(false);
      setError(err.message)
  });

  fetch(`http://cultivation.runasp.net/api/Land/GetById?id=${parentLinkId}`)
    .then((res)=>{
      if(!res.ok){
          throw Error("couldn't fetch data for that resource" )
      }
      return  res.json();
  })
    .then((data)=>{
      setParentTitle(data.title);
      setIsPending(false);
      setError("");
    })
    .catch(err=>{
      setIsPending(false);
      setError(err.message)
  })
},[]);

  return(
    <AddForm
      url={(addLandApi.addLand())}
      data={{title:title,
        size:parseInt(size),
        location:location,
        parentId:parentId}}

      inputSizeBox={false}
      inputTypeBox={true}
      inputNPKBox={true}
      inputDescription={true}
      id={id}

      direction={`lands/child/${parentLinkId}/grandchild/${id}`}
      TitleLabel="Ad:(Please don't modify)"
      childLands={false}
      title={title}
      setTitle={setTitle}
      publicDetailsLabel="Konum:"
      publicDetails={location}
      setpublicDetails={setLocation}
      quantityLabel="Boyut:"
      parentTitle={parentTitle}
      quantity={size}
      setQuantity={setSize}
      parentSize={parentSize}
      
      button="Ekleme"
    />
    );
}