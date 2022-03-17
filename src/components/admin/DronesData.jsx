import { useState, useEffect } from "react";
import CreateDrone from "./CreateDrone";
const DronesData = () =>{

    
    
    const [data, setData] = useState(null);
    const [drone, setDrone] = useState({
        serial: 0,
        customName: "",
        isActive: false,
        })
    const [visible, setVisible] = useState({show: false, name: "Create"});

    useEffect(()=>{     
        const getAllDrones = async() =>{

            const requestUrl = "https://localhost:44308/api/Drone/GetAll"
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
            })
        };
        getAllDrones().catch(error => console.error(error));
    },[]);

    const handleVisible = e =>{
                  
        if(visible.show){
                setVisible({show: false, name: "Create"})
                console.log(visible)

            }else{
                setVisible({show: true, name: "Close"})
                console.log(visible)
            }
    }
    const handleVisibleDiv = (index) =>{
        
        const divStyle = document.getElementById(index)
        
        if(divStyle.style.display==="none"){

            divStyle.style.display = "block"

        } else{

            divStyle.style.display = "none"
        } 
        
    }
    
    const handleDelete = async (serial) =>{

        
        const requestUrl = "https://localhost:44308/api/Drone?serial="+JSON.stringify(serial);
            const requestOptions = {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            }
        const response = await fetch(requestUrl,requestOptions)
        const responseText = await response.text();
        
        
        if(response!==null){
            window.alert(responseText);
            window.location.reload();
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
        
        <div>
            {data !== null?( 
                <div className="col-3">
                    <div>Create New Drone: </div>
                    <button className="container btn btn-info"onClick={handleVisible}>{visible.name}</button>
                    {visible.show===true?(
                        <div>
                            <CreateDrone/>
                        </div>
                    ):(
                        null
                    )}
                    
                    <div>{data.forEach(element => {
                          itemList.push(
                              <div className="mt-3">                                
                                    <div className="card card-header">Name: {element.customName}</div>
                                    <div className="card border-secondary">Model: {element.model}</div>
                                    <div className="card border-secondary">Serial: {element.serial}</div>
                                    <div className="card border-secondary">Active: {String(element.isActive)}</div>
                                    <div className="d-flex">
                                        <button className="btn btn-primary" onClick={()=>handleVisibleDiv(element.serial)}>Edit</button>
                                        <button className="btn btn-danger ml-auto" onClick={()=>handleDelete(element.serial)}>Delete</button>
                                    </div>
                                    
                                    
                                    <div id={element.serial} style={{display:"none"}}>
                                        
                                    <div className="card text-white bg-primary mt-3 pt-2"> 
                                    <div className="btn btn-info m-1">Edit Drone Form</div>
                                            <div className="form-group m-2">
                                            
                                                <label className="col-form-label " htmlFor="name">Type new drone name:</label>
                                                <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setDrone({...drone, customName: e.target.value})}/>

                                                <label className="col-form-label " htmlFor="checkbox">Set drone active status:</label>
                                                <input className="form-control form-control-sm" type="checkbox" name="checkbox" id="checkbox" onChange={e=>setDrone({...drone, isActive: e.target.checked})}/>
                                                                
                                                <button className="d-flex btn btn-success"onClick={()=>handleEdit(element.serial)}>Sumbit</button>
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
   
};

export default DronesData;