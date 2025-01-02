import React, { useEffect, useState } from 'react';
import './top.css';

//imported images==============>
import img1 from '../../../Assets/flower3.jpg';
import img2 from '../../../Assets/flower5.jpg';
import img3 from '../../../Assets/flower1.jpg';
import img4 from '../../../Assets/flower12.jpg';
import img5 from '../../../Assets/flower13.jpg';
import img6 from '../../../Assets/flower6.jpg';


//imported icons===============>
import { MdOutlineNotificationsActive } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { BsArrowRightShort, BsQuestionCircleFill } from "react-icons/bs";
import { FaCartFlatbed } from "react-icons/fa6";
import { Link } from 'react-router-dom';


export default function Top(){
    const [activeTab, setActiveTab] = useState(0);
    const imgs = [img1,img2,img3,img4,img5,img6]; // أسماء الأوراق
    let [flowersAvg,setFlowerAvg]=useState(0);
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showFlowerApi = isDev? {
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getNumOfFlower:()=>{return (`${showFlowerApi.baseUrl}/GetFlowerAverageInDonum`)},

    }:{
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getNumOfFlower:()=>{return (`${showFlowerApi.baseUrl}/GetFlowerAverageInDonum`)},
    }

    useEffect(()=>{
        fetch(showFlowerApi.getNumOfFlower())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setFlowerAvg(parseInt(data));
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        });
    },[])
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setActiveTab((prevTab) => (prevTab + 1) % imgs.length);
      }, 3000); // تغيير الورقة كل 3 ثوانٍ
  
      return () => clearInterval(intervalId);
    }, []);
    return(
        <div className='topSection' >
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir..</div>}
            <div className='headerSection flex'>
                <div className='title'>
                    <h1>Welcome to planti.</h1>
                    <p>Hello Everybody, Welcome back!</p>
                </div>
                
                <div className='adminDiv flex'>
                {/* <Link  to="/new-oreder"><FaCartFlatbed className='icon'/></Link> */}
                <AiOutlineMessage className='icon'/>
                <MdOutlineNotificationsActive className='icon'/>  
                

                </div>
                {/* <div className='searchBar'>
                    <input type='text' placeholder='Search Dashboard'/>
                    <BiSearchAlt className='icon'/>
                </div> */}
            </div>

            <div className='cardSection flex'>

                <div className='rightCard flex'>
                    <h1>Create and sell extraordinary products </h1>
                    <p>The world's fast growing industry today are natural made products</p>
                    
                    <div className='buttons flex'>
                        <button className='btn'>Explore More</button>
                        <button className='btn transparent'>Top Sellers</button>
                    </div>
                    <div className='tab-container'>
                        <div className="videoDiv">
                        <img src={imgs[activeTab]} className="transition-image" />
                          

                        </div>
                    </div>

                </div>

                <div className='leftCard flex'>
                    <div className='main flex'>

                        <div className='textDiv'>
                            <h1>About Us</h1>

                            <div className='flex'>
                                <span>
                                    Flowers Average: <br/><small>{flowersAvg} Per Donum</small>
                                </span>
                                {/* <span>
                                    This Month <br/><small>175 Orders</small>
                                </span> */}
                            </div>

                            {/* <span className='flex link'>
                                Go to my orders <BsArrowRightShort className='icon'/>
                            </span> */}
                        </div>

                    </div>

                    {/* we will use this later */}
                        {/* <div className='sideBarCard'>
                            <BsQuestionCircleFill className='icon'/>

                            <div className='cardContent'>
                                <div className='circle1'></div>
                                <div className='circle2'></div>

                                <h3>Help Center</h3>
                                <p>Having trouble ib Planti, please contact us from more questions.</p>

                                <button className='btn'>Go To Help Center</button>
                            </div>
                        </div> */}


                </div>

            </div>
        </div>
    );
}