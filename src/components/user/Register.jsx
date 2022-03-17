import { useState } from "react";


const Register = () =>{

    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        serial: ""})

    const handleRegister = async e =>{
       
        const requestOptions = {
            method: 'POST',
            headers: {'accept': '*/*','Content-Type': 'application/json','Access-Control-Allow-Origin':" *"},
            body: JSON.stringify(data)
        }
        const reguestUrl = "https://localhost:44308/api/User/Register";
        const response = await fetch(reguestUrl, requestOptions);
        const responseValue = await response.text();
        
        console.log(response);
        await console.log(response.value);
        
        if(responseValue!==null){
            await window.alert(responseValue);
            window.history.pushState({},"","/Login");
            window.location.reload();
        }else{
            window.alert(responseValue);
        }

    }

    return(
        <div className="card border-secondary m-3 p-2"> Register Form:
                

                <div className="form-group">
                    <label className="col-form-label mt-1" htmlFor="email">E-mail:</label>
                    <input className="form-control" type="email" name="email" id="email" onChange={e=>setData({...data, email: e.target.value})}/>
                    
                    <label className="col-form-label mt-1" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={e=>setData({...data, password: e.target.value})}/>

                    <label className="col-form-label mt-1" htmlFor="confirmPassword">Confirm Password:</label>
                    <input className="form-control" type="password" name="confirmPassword" id="confirmPassword" onChange={e=>setData({...data, confirmPassword: e.target.value})}/>

                    <label className="col-form-label mt-1" htmlFor="name">User Name:</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={e=>setData({...data, name: e.target.value})}/>

                    <label className="col-form-label mt-1" htmlFor="serial">Drone Serial:</label>
                    <input className="form-control" type="number" name="serial" id="serial" onChange={e=>setData({...data, serial: e.target.value})}/>

                </div>
                <button className="btn btn-success m-2"onClick={e=>handleRegister(e)}>Register</button>
        </div>
    );
}

export default Register