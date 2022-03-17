import { useState } from "react";


const DroneRegister = () =>{

    const [data, setData] = useState({customName: "", serial: 0})

    const handleCreate = async e =>{
       
        const requestOptions = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            body: JSON.stringify(data)
        }
        const reguestUrl = "https://localhost:44308/api/Drone/Register";
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
        <div className="card text-white bg-primary mt-3 pt-2"> 
        <div className="btn btn-info m-1">Drone Creation</div>
                <div className="form-group m-2">
                
                    <label className="col-form-label " htmlFor="email">Set drone name:</label>
                    <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setData({...data, customName: e.target.value})}/>

                    <label className="col-form-label " htmlFor="serial">Type drone serial:</label>
                    <input className="form-control form-control-sm" type="number" name="serial" id="serial" onChange={e=>setData({...data, serial: e.target.value})}/>
                    <button className="btn btn-secondary mt-1" onClick={e=>handleCreate(e)}>Submit</button>
                </div>
        </div>
    );
}

export default DroneRegister