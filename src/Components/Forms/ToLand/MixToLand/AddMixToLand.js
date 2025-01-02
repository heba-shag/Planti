import '../../../Body Section/Listing Section/listing.css';
import React from 'react';
// import './listing.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



//imported icons=====================>
import { BsArrowRightShort } from "react-icons/bs";
import { FaCheckSquare  } from 'react-icons/fa';
import { BiDetail} from 'react-icons/bi'

//imported images===================>
import img1 from '../../../../Assets/IMG-20221105-WA0000.jpg';
import img2 from '../../../../Assets/IMG-20220804-WA0048.jpg';
import img3 from '../../../../Assets/IMG-20220804-WA0046.jpg';


export default function AddMixToLand(){

    let [isPending,setIsPending]=useState(true);
        let [error,setError]=useState("");
        
        let [lands,setLands]=useState([]);
    
        const [activeCircle, setActiveCircle] = useState(null);

  const circleData = [
    { text: ' 1' },
    { text: ' 2' },
    { text: ' 3' },
    { text: ' 4' },
    { text: ' 5' },
    { text: ' 6' },
    { text: ' 7' },
    { text: ' 8' },
    { text: ' 9' },
    { text: ' 10' },
    { text: ' 11' },
  ];

  const handleCircleClick = (index) => {
    setActiveCircle(index === activeCircle ? null : index);
  };

        // multiple environment
    
        let isDev=process.env.NODE_ENV === 'development';
        const showLandApi = isDev? {
    
            baseUrl: process.env.REACT_APP_API_LAND_URL,
            getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},
    
        }:{
            baseUrl: process.env.REACT_APP_API_LAND_URL,
            getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},
    
        }
    
        useEffect(()=>{
            fetch(showLandApi.getAllLand())
            .then((res)=>{
                if(!res.ok){
                    throw Error("couldn't fetch data for that resource" );
                }
                return  res.json();
            })
            .then((data)=>{
                setLands(data)
                setIsPending(false);
                setError("");
            })
            .catch(err=>{
                setIsPending(false);
                setError(err.message);
                console.log(err)
            })
        },[]);
    
        const showLands=lands.slice(0,4).map((land,index)=>
            <tr key={index}>
                <td>{land.title}</td>
                <td>{land.size}</td>
                <td>{land.location}</td>
                <td ><Link to={`/lands/child/${land.id}`}> <BiDetail className="icon"/></Link></td>
            </tr>
        );

    return(
    <div className='mixToLandSection'>
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir...</div>}
            <div className='heading flex'>
                <h1>Lands dosn't add mix</h1>
                <button className='btn flex'>
                Daha fazla göster<BsArrowRightShort className='icon'/>
                </button>
            </div>

            <div className='bigContainer flex'>
                

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(231, 70, 70)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"rgb(255, 229, 202)"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(231, 70, 70)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(250, 152, 132)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>
                            </div>

                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                            <div className="circle" style={{backgroundColor:"rgb(231, 70, 70)"}}>
                                hi
                            </div>

                            </div>
                            </>
                            ))}
                        </div>
                        <div className='btn' style={{backgroundColor:"rgb(231, 70, 70)"}}> Save</div>                  
                    </div>

                    <div style={{backgroundColor:"rgb(255, 229, 202)"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(231, 70, 70)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(250, 152, 132)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>
                            </div>

                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                            <div className="circle" style={{backgroundColor:"rgb(231, 70, 70)"}}>
                                hi
                            </div>

                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(247, 127, 0)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"rgb(234, 226, 183)"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(247, 127, 0)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(252, 191, 73)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>
                            </div>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle" style={{backgroundColor:"rgb(247, 127, 0)"}}>
                                    hi
                                </div>
                               
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(255, 214, 31)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"#F6EFBD"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(255, 214, 31)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(255, 233, 133)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>

                            </div>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle" style={{backgroundColor:"rgb(255, 214, 31)"}}>
                                    hi
                                </div>
                                
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(74, 98, 138)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"#C5D3E8"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(74, 98, 138)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(122, 178, 211)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>

                            </div>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>

                                <div className="circle" style={{backgroundColor:"rgb(74, 98, 138)"}}>
                                hi
                                </div>
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(155, 114, 207)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"rgb(235, 217, 252)"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(155, 114, 207)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(194, 179, 229)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>

                            </div>

                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>

                                <div className="circle" style={{backgroundColor:"rgb(155, 114, 207)"}}>
                                   hi
                                </div>
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>

                <div className='secContainer flex'>
                    <h1 style={{color:"rgb(79, 119, 45)"}}>Land1 </h1>
                    
                    <div style={{backgroundColor:"#CBD2A4"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(79, 119, 45)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(144, 169, 85)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>

                            </div>

                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>

                                <div className="circle" style={{backgroundColor:"rgb(79, 119, 45)"}}>
                                    hi
                                </div>
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                    <div style={{backgroundColor:"#CBD2A4"}} className='singleItem'>
                        {/* done with the color of the land */}
                        <FaCheckSquare  className='icon' style={{color:"rgb(79, 119, 45)"}}/>

                        {/* mix name */}
                        <h3 style={{color:"rgb(144, 169, 85)"}}>Mix Name1 </h3>
                        <div className='allCircles flex'>
                            {circleData.map((item, index) => (
                                <>
                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>
                                <div className="circle">
                                    {item.text}
                                </div>

                            </div>

                            <div key={index} className={`singleCircle ${index === activeCircle ? 'active' : ''} flex`} onClick={() => handleCircleClick(index)}>

                                <div className="circle" style={{backgroundColor:"rgb(79, 119, 45)"}}>
                                    hi
                                </div>
                            </div>
                            </>
                            ))}
                        </div>
                                                
                    </div>

                </div>


            </div>


            {/* tables */}

            
        </div>
    );
}