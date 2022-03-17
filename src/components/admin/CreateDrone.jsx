import { useState } from "react";


const CreateDrone = () =>{

    const [data, setData] = useState({model: ""})

    const handleCreate = async e =>{
       
        const requestOptions = {
            method: 'POST',
            headers: {'accept': '*/*','Content-Type': 'application/json','Access-Control-Allow-Origin':" *"},
            body: JSON.stringify(data)
        }
        const reguestUrl = "https://localhost:44308/api/Drone";
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

    return(
        <div>              
                <div className="card text-white bg-primary mt-3 pt-2"> 
                    <div className="btn btn-info m-1">Create Drone Form</div>
                        <div className="form-group m-2">
                                            
                        <label className="col-form-label " htmlFor="name">Type new drone model:</label>
                         <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setData({...data, model: e.target.value})}/>

                                                                
                        <button className="d-flex btn btn-success"onClick={e=>handleCreate(e)}>Sumbit</button>
                    </div>
                </div>
        </div>
    );
}

export default CreateDrone