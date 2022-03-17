import React, { useEffect, useState } from "react";
import DroneRegister from "./user/DroneRegister";

const Drones = () => {
    
    const [data, setData] = useState(null);
    const [drone, setDrone] = useState({
        serial: 0,
        customName: "",
        isActive: false,
        });
    const [visible, setVisible] = useState({show: false, name: "Register Drone"});
    useEffect(()=>{     
        const getUserDrones = async() =>{

            const requestUrl = "https://localhost:44308/api/Drone/GetAllUserDrone"
            const requestOptions = {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            }
            fetch(requestUrl,requestOptions)
                .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                localStorage.setItem("Drones",JSON.stringify(data));
            })
        };
        getUserDrones().catch(error => console.error(error));
    },[]);
    const handleVisibleDiv = (index) =>{
        
        const divStyle = document.getElementById(index)
        
        if(divStyle.style.display==="none"){

            divStyle.style.display = "block"

        } else{

            divStyle.style.display = "none"
        } 
        
    }
    const handleVisible = e =>{
                  
        if(visible.show){
                setVisible({show: false, name: "Register Drone"})
                console.log(visible)

            }else{
                setVisible({show: true, name: "Close"})
                console.log(visible)
            }
    }
    const handleEdit = async (serial) =>{
       
        drone.serial = serial;
        console.log(serial);
        console.log(drone);

        const requestOptions = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            body: JSON.stringify(drone)
        }
        const reguestUrl = "https://localhost:44308/api/Drone/Edit"
        const response = await fetch(reguestUrl, requestOptions);
        const responseValue = await response.text();
        
        console.log(response);
        await console.log(response.value);
        
        if(responseValue!==null){
            await window.alert(responseValue);
            window.location.reload();
        }else{
            window.alert(responseValue);
        }

    }
    const itemList = [];
    return(
        
        <div className="col-10">
            {data !== null?( 
                <div className="col-3">
                    <button className="btn btn-primary mt-2 container"onClick={handleVisible}>{visible.name}</button>
                    {visible.show===true?(
                        <div>
                            <DroneRegister/>
                        </div>
                    ):(
                        null
                    )}
                    <div className="mt-2">{data.forEach(element => {
                          itemList.push(
                              <div className="mt-2">
                                <div className="card border-secondary" style={{"maxWidth":"20rem"}}>
                                    <div className="card-header">Name: {element.customName}</div>
                                    <div className="card-body">
                                        <h4 className="card-title">Model: {element.model}</h4>
                                        <p className="card-text">Serial:{element.serial}</p>
                                        <p className="card-text">IsActive: {String(element.isActive)}</p>
                                    </div>
                                    <button className="btn btn-success" onClick={()=>handleVisibleDiv(element.serial)}>Edit</button>
                                </div>                                                                 
                                
                                    
                                <div className="form-group" id={element.serial} style={{display:"none"}}>
                                    
                                <div className="card text-white bg-primary mt-3 pt-2"> 
                                    <div className="btn btn-info m-1">Edit Drone Form</div>
                                            <div className="form-group m-2">
                                            
                                            <label className="col-form-label col-form-label-sm mt-2" htmlFor="name">Type new drone name</label>
                                            <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setDrone({...drone, customName: e.target.value})}/>

                                                <label className="col-form-label col-form-label-sm mt-2" htmlFor="checkbox">Set drone active status:</label>
                                                <input className="form-control form-control-sm" type="checkbox" name="checkbox" id="checkbox" onChange={e=>setDrone({...drone, isActive: e.target.checked})}/>
                                                                
                                                <button className="d-flex btn btn-success" onClick={()=>handleEdit(element.serial)}>Sumbit</button>
                                            </div>
                                    </div>
                                   
                                                                             
                                    
                                </div>

                                


                              </div>                             
                          )
                    })}</div>
                    <div>{itemList}</div>
                    
                </div>  
            ):(
            <div>Fetch Error</div>
            )}
        </div>
    );
}

export default Drones;