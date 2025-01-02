import React, { useEffect, useState } from 'react';
import './activity.css';

//imported icons================>
import { IoIosArrowBack,  IoIosArrowForward } from "react-icons/io";

//imported images
import task from '../../../Assets/check.jpg';
import unTask from "../../../Assets/wrong.png";
import { Link, NavLink } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import moment from 'moment';

export default function Activity(){
    
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [fertilizerData,setFertilizer]=useState([]);
    let [insecticideData,setInsecticide]=useState([]);
    let [cuttingData,setCutting]=useState([]);
    let [unfertilizerData,setUnfertilizer]=useState([]);
    let [uninsecticideData,setUnInsecticide]=useState([]);

    const [activeTab, setActiveTab] = useState(1);
    const [active2Tab, setActive2Tab] = useState(1);

    const [bigActiveTab, setBigActiveTab] = useState(1);

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showProgressLandApi = isDev? {

        baseFertUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
        getAllFertLand:()=>{return (`${showProgressLandApi.baseFertUrl}/GetAll`)},
        getAllUnFertLand:()=>{return (`${showProgressLandApi.baseFertUrl}/GetLandsWhichNotUsedInDay`)},

        baseInsecUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        getAllInsecand:()=>{return (`${showProgressLandApi.baseInsecUrl}/GetAll`)},
        getAllUnInsecLand:()=>{return (`${showProgressLandApi.baseInsecUrl}/GetLandsWhichNotUsedInDay`)},

        baseCuttingUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingand:()=>{return (`${showProgressLandApi.baseCuttingUrl}/GetAll`)},
    }:{
        baseFertUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
        getAllFertLand:()=>{return (`${showProgressLandApi.baseFertUrl}/GetAll`)},
        getAllUnFertLand:()=>{return (`${showProgressLandApi.baseFertUrl}/GetLandsWhichNotUsedInDay`)},

        baseInsecUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        getAllInsecand:()=>{return (`${showProgressLandApi.baseInsecUrl}/GetAll`)},
        getAllUnInsecLand:()=>{return (`${showProgressLandApi.baseInsecUrl}/GetLandsWhichNotUsedInDay`)},

        baseCuttingUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingand:()=>{return (`${showProgressLandApi.baseCuttingUrl}/GetAll`)},
    }

    const handleTableChange = (index) => {
        setActiveTab(index);
    };
    
    const handleTable2Change = (index) => {
        setActive2Tab(index);
    };

    const handleBigTableChange = (index) => {
        setBigActiveTab(index);
    };

    useEffect(()=>{
        fetch(showProgressLandApi.getAllFertLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setFertilizer(data.data);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });
        fetch(showProgressLandApi.getAllInsecand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setInsecticide(data.data);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });
        fetch(showProgressLandApi.getAllCuttingand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setCutting(data.data);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });

        fetch(showProgressLandApi.getAllUnFertLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setUnfertilizer(data);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });

        fetch(showProgressLandApi.getAllUnInsecLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setUnInsecticide(data);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });

    },[]);

    return(
        <div className='activitySection flex'>

            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir...</div>}
            <div className='big-swipe-buttons flex'>
                <NavLink activeClassName="active" className="swipeBtn flex" ><IoIosArrowBack style={{backgroundColor:bigActiveTab===1?"#528e25":"#bebebe"}}  onClick={() => handleBigTableChange(1)} className='icon'/> </NavLink>
            </div>
            <div className='bigSwip'>
            {bigActiveTab === 1 && (
                <>
                <div className="heading flex">
                        <h1>Geçmiş işlemler:</h1>
                        <button className="btn flex">
                            {activeTab===1 &&(<Link className='link-btn flex' to="/fertland/show-Fertilizer">Daha fazla göster<BsArrowRightShort className="icon" /></Link>)}
                            {activeTab===2 &&( <Link className='link-btn flex' to="/inseLand/show-insecticide">Daha fazla göster<BsArrowRightShort className="icon" /></Link>)}
                            {activeTab===3 &&(<Link className='link-btn flex' to="/cuttingLand">Daha fazla göster<BsArrowRightShort className="icon" /></Link>)}
                        </button>
                </div>
                <div  className='swiper'>
                    
                    {activeTab === 1 && (
                        <>
                        {fertilizerData.map((dat,index)=>
                        <>
                        <div  className='secContainer grid'>
                        {dat.fertilizerLand.map((item,i)=>
                        
                            <div className='singleTask flex'>
                                <img src={task} alt='Task Image'/>
                                <div key={i} className='taskDetails'>
                                    <span className='name'>Gübre: {item.fertilizer.publicTitle}</span>
                                    <small>Tarla: {item.cuttingLand.land.title}</small>
                                    <small>Döz: {item.quantity}</small>
                                    <small>Tür: {item.type===0?"هوائي":"جذري"}</small>
                                </div>
                                <div key={index} className='duration'>
                                    {moment(dat.date).format('YYYY-MM-DD HH:mm')}
                                </div>
                            </div>
                        )}
                        </div>
                        </>
                        )}
                        </>
                        )}

                    {activeTab === 2 && (
                        <>
                        {insecticideData.map((dat)=>
                        <div className='secContainer grid'>
                        
                        {dat.insecticideLand.map((item)=>
                            <div className='singleTask flex'>
                                
                                <img src={task} alt='Task Image'/>
                                
                                <div className='taskDetails'>
                                    <span className='name'>ilaç: {item.insecticide.publicTitle}</span>
                                    <small>Tarla: {item.cuttingLand.land.title}</small>
                                    <small>Litre: {item.liter} l</small>
                                    <small>Döz: {((item.quantity)===null||(item.quantity)===0)?"--":item.quantity+" g" }</small>
                                    <small>Note: {item.note}</small>
                                </div>
                                
                                <div className='duration'>
                                    {new Date(dat.date).toLocaleDateString()}
                                </div>
                            </div>
                        )}
                        </div>
                        )}
                        </>
                    )}

                        {activeTab===3&&(
                            <>
                        
                        <div className='secContainer grid'>
                        {cuttingData.map((dat,index)=>
                            <div className='singleTask flex'>
                                <img src={task} alt='Task Image'/>

                                <div className='taskDetails'>
                                    <span className='name'>Dikilme Renk Code: {dat.cuttingColor.code}</span>
                                    <small>Tarla: {dat.land.title}</small>
                                    <small>Döz: {dat.quantity}</small>
                                </div>

                                <div className='duration'>
                                    {new Date(dat.date).toLocaleDateString()}
                                </div>
                            </div>
                        )}
                        </div>
                        </>
                    )} 
                    
                    
                </div>
                <div className='swipe-buttons flex'>
                    <NavLink activeClassName="active" className="swipeBtn" style={{backgroundColor:activeTab===1?"#528e25":"#bebebe"}} onClick={() => handleTableChange(1)}> </NavLink>
                    <NavLink activeClassName="active" className="swipeBtn" style={{backgroundColor:activeTab===2?"#528e25":"#bebebe"}} onClick={() => handleTableChange(2)}> </NavLink>
                    <NavLink activeClassName="active" className="swipeBtn" style={{backgroundColor:activeTab===3?"#528e25":"#bebebe"}}  onClick={() => handleTableChange(3)}> </NavLink>
                </div>
                </>
            )}
                {bigActiveTab === 2 && (
                <>
                <div className="heading flex">
                    {active2Tab===1 &&(
                        <>
                        <h1>unfertilizer Lands:</h1>
                        <button className="btn flex">
                           <Link className='link-btn flex' to="/fertland/samadLands">Ekleme<BsArrowRightShort className="icon" /></Link>
                        </button>
                        </>
                    )}
                    {active2Tab===2&&(
                        <>
                        <h1>uninsecticide Lands:</h1>
                        <button className="btn flex">
                           <Link className='link-btn flex' to="/inseLand/addInsecticideLand">Ekleme<BsArrowRightShort className="icon" /></Link>
                        </button>
                        </>
                        )}
                </div>
                <div  className='swiper'>
                    
                     {active2Tab === 1 && (
                        <>
                        <div className='secContainer grid'>
                        {unfertilizerData.map((dat)=>
                            <div className='singleTask flex'>
                                <img src={unTask} alt='Task Image'/>

                                <div className='taskDetails'>
                                    <span className='name'>Tarla: {dat.title}</span>
                                    <small>Boyut: {dat.size}</small>
                                    <small>Konum: {dat.location}</small>
                                </div>

                                <div className='duration'>
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                        )}
                        </div>
                        </>
                        )}

                    {active2Tab === 2 && (
                        <>
                        
                        <div className='secContainer grid'>
                        {uninsecticideData.map((dat)=>
                            <div className='singleTask flex'>
                                <img src={unTask} alt='Task Image'/>

                                <div className='taskDetails'>
                                    <span className='name'>Tarla: {dat.title}</span>
                                    <small>Boyut: {dat.size}</small>
                                    <small>Konum: {dat.location}</small>
                                </div>

                                <div className='duration'>
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                        )}
                        </div>
                        </>
                    )}

                </div>
                <div className='swipe-buttons flex'>
                    <NavLink activeClassName="active" className="swipeBtn" style={{backgroundColor:active2Tab===1?"#528e25":"#bebebe"}} onClick={() => handleTable2Change(1)}> </NavLink>
                    <NavLink activeClassName="active" className="swipeBtn" style={{backgroundColor:active2Tab===2?"#528e25":"#bebebe"}} onClick={() => handleTable2Change(2)}> </NavLink>
                </div>
                </>
                )}
            </div>
            

            <div className='big-swipe-buttons flex'>
            <NavLink activeClassName="active" className="swipeBtn flex" ><IoIosArrowForward style={{backgroundColor:bigActiveTab===2?"#528e25":"#bebebe"}}  onClick={() => handleBigTableChange(2)} className='icon'/> </NavLink>
            </div>
        </div>
    );  
}