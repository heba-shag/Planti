import { BsQuestionCircleFill } from 'react-icons/bs';
import '../../Lands/lands.css';
import {useEffect, useState } from 'react';


export default function DetailsForm(props){
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    const id=window.location.pathname.split("/").slice(-1)[0];

    useEffect(()=>{
        fetch(`${props.getById}`)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" );
            }
            return  res.json();
        })
        .then((data)=>{
            if(props.landDetails===false){
                console.log(data.id);
                props.setTitle(data.title);
                props.setSize(data.size);
                props.setLocation(data.location);
            }
            if(props.fertilizerDetails===false){
                props.setTitle(data.title);
                props.setPublicTitle(data.publicTitle);
                props.setNpk(data.npk);
                props.setDescription(data.description)
            }
            if(props.insecticideDetails===false){
                props.setTitle(data.title);
                props.setPublicTitle(data.publicTitle);
                props.setDescription(data.description);
                props.setType(data.type);
            }
            if(props.cuttingColorDetails===false){
                props.setCode(data.code);
                props.setColorCode(data.color.code);
                props.setColorTitle(data.color.title);
                props.setCuttingAge(data.cutting.age);
                props.setCuttingType(data.cutting.type);
                props.setCuttingTitle(data.cutting.title);
            }
            setIsPending(false);
            setError("");

        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });
    },[])

    

    return(
        <div className="details-formContainer flex ">
            {props.landDetails===false?(props.error&&<div>Hatalı</div>):
            (error&&<div>Hatalı</div>)}
            {isPending&&<div>indir...</div>}

            <div className='details-icon flex'>
                <BsQuestionCircleFill className='icon'/>
            </div>

            <div className='details-form' >
                <div className='circle1'></div>
                <div className='circle2'></div>

                <div className="formTitle">Details About {props.detailsTitle}</div>
                <div className="LandDetails" >

                    {props.landDetails===false &&(<>
                    <div className="input-box flex">
                        <label className="details">{props.TitleLabel}</label>
                        <label className='details-text'>{props.title}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.GrandTitleLabel}</label>
                        <label className='details-text'>{props.grandName|| "indir.."}</label>
                    </div>


                    <div className="input-box flex">
                        <label className="details">{props.locationLabel}</label>
                        <label className='details-text'>{props.location}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.sizeLabel}</label>
                        <label className='details-text'>{props.size}</label>
                    </div>

                   
                    </>)}

                    {props.fertilizerDetails===false &&(<>
                    <div className="input-box flex">
                        <label className="details">{props.TitleLabel}</label>
                        <label className='details-text'>{props.title}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.publicTitleLabel}</label>
                        <label className='details-text'>{props.publicTitle}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.NPKLabel}</label>
                        <label className='details-text'>{props.npk}</label>
                    </div>

                    <div className="input-box flex">
                        <label  className="details">{props.descriptionLabel}</label>
                        <label className='details-text'>{props.description}</label>
                    </div>
                    </>)}

                    {props.insecticideDetails===false &&(<>
                    <div className="input-box flex">
                        <label className="details">{props.TitleLabel}</label>
                        <label className='details-text'>{props.title}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.publicTitleLabel}</label>
                        <label className='details-text'>{props.publicTitle}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.typeLabel}</label>
                        <label className='details-text'>{props.type}</label>
                    </div>

                    <div className="input-box flex">
                        <label  className="details">{props.descriptionLabel}</label>
                        <label className='details-text'>{props.description}</label>
                    </div>
                    </>)}
                    
                    {props.cuttingColorDetails===false &&(<>
                    <div className="input-box flex">
                        <label className="details">{props.codeLabel}</label>
                        <label className='details-text'>{props.code}</label>
                    </div>
                    
                    <div className="input-box flex">
                        <label className="details">{props.colorTitleLabel}</label>
                        <label className='details-text'>{props.colorTitle}</label>
                    </div>

                    <div className="input-box flex">
                        <label className="details">{props.colorCodeLabel}</label>
                        <label className='details-text'>{props.colorCode}</label>
                    </div>

                    <div className="input-box flex">
                        <label  className="details">{props.cuttingTitleLabel}</label>
                        <label className='details-text'>{props.cuttingTitle}</label>
                    </div>

                    <div className="input-box flex">
                        <label  className="details">{props.cuttingAgeLabel}</label>
                        <label className='details-text'>{props.cuttingAge}</label>
                    </div>

                    <div className="input-box flex">
                        <label  className="details">{props.cuttingTypeLabel}</label>
                        <label className='details-text'>{props.cuttingType}</label>
                    </div>
                    </>)}
                </div>

            </div>
        </div>
    );
}