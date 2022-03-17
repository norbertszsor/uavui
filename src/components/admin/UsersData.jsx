import { useState,useEffect } from "react";



const UsersData = () =>{

    
    const [data, setData] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        isActive: false
        })

    useEffect(()=>{     
        const getAllDrones = async() =>{

            const requestUrl = "https://localhost:44308/api/User"
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
    
    const handleVisibleDiv = (index) =>{
        
        const divStyle = document.getElementById(index)
        
        if(divStyle.style.display==="none"){

            divStyle.style.display = "block"

        } else{

            divStyle.style.display = "none"
        } 
        
    }
    const handleDelete = async (id) =>{

        console.log(id);
        const requestUrl = "https://localhost:44308/api/User/"+id;
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

    const handleEdit = async (id) =>{
       
        user.serial = id;
        console.log(id);
        console.log(user);

        const requestOptions = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            body: JSON.stringify(user)
        }
        const reguestUrl = "https://localhost:44308/api/User/EditUser"
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
        <div className="">
            {data !== null?( 
                <div className="col-3">
                    
                                     
                    <div>{data.forEach(element => {
                          itemList.push(
                              <div className="mt-2">                                
                                    <div className="card border-secondary">User Id: {element.id}</div>
                                    <div className="card border-secondary">User Name: {element.name}</div>
                                    <div className="card border-secondary">User Email: {element.email}</div>
                                    <div className="card border-secondary">Active: {element.isActive}</div>
                                    <div className="d-flex ">
                                        <button className="btn btn-primary"onClick={()=>handleVisibleDiv(element.id)}>Edit</button>
                                        <button className="btn btn-danger ml-auto"onClick={()=>handleDelete(element.id)}>Delete</button>
                                    </div>
                                    
                                    
                                    <div id={element.id} style={{display:"none"}}>
                                    <div className="card text-white bg-primary mt-3 pt-2"> 
                                    <div className="btn btn-info m-1">Edit user Form</div>
                                            <div className="form-group m-2">
                                            
                                                <label className="col-form-label " htmlFor="email">Type new email:</label>
                                                <input className="form-control form-control-sm" type="email" name="email" id="emial" onChange={e=>setUser({...user, email: e.target.value})}/>

                                                <label className="col-form-label " htmlFor="name">Type new user name:</label>
                                                <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setUser({...user, name: e.target.value})}/>

                                                <label className="col-form-label " htmlFor="checkbox">Set user active status:</label>
                                                <input className="form-control form-control-sm" type="checkbox" name="checkbox" id="checkbox" onChange={e=>setUser({...user, isActive: e.target.checked})}/>
                                                                
                                                <button className="btn btn-success mt-1"onClick={()=>handleEdit(element.id)}>Sumbit</button>
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

export default UsersData;