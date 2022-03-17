import React, { useState } from "react";
import Register from "./user/Register";
import jwtDecode from "jwt-decode";

const Login = () => {

    const [data, setData] = useState({email: "", password: ""})
    const [register, setRegister] = useState({show: false, name: "Register"});
    const handleLogin = async e =>{

        const requestOptions = {
            method: 'POST',
            headers: {'accept': '*/*','Content-Type': 'application/json','Access-Control-Allow-Origin':" *"},
            body: JSON.stringify(data)
        }
        const reguestUrl = "https://localhost:44308/api/Authentication";
        
        const response = await fetch(reguestUrl, requestOptions);
        const JWToken = await response.text(); 


        if(JWToken!=="Unvalid user or password"){
            await localStorage.setItem("JWToken",JWToken);
            
            const tokenDecode = jwtDecode(JWToken);
            const role =Object.values(tokenDecode)[1];
            
            await localStorage.setItem("Role",role);

            if(role==="user"){
                window.history.pushState({},"","/Drones");
            }else{
                window.history.pushState({},"","/UsersData");
            }
           
            window.location.reload();

        }else{
            window.alert(JWToken);
        }

    }
    const handleRegister = e =>{
        
            
        if(register.show){
                setRegister({show: false, name: "Register"})
                console.log(register)

            }else{
                setRegister({show: true, name: "Close"})
                console.log(register)
            }
    }

    return(
        <div className="container mt-5 p-2 col-5">
            <h2 className=" d-flex justify-content-center" >Uav Monitor</h2>
            

            <div className="form-group">
            <label className="form-label mt-4">Login:</label>
            <div className="form-floating mb-3">
                <input className="form-control"type="email" name="email" id="femail" placeholder="e-mail@example.com" onChange={e=>setData({...data, email: e.target.value})} />
   
            </div>
            <div className="form-floating">
                <input className="form-control" type="password" name="password" id="fpassword" placeholder="password" onChange={e=>setData({...data, password: e.target.value})} />

            </div>
            </div>
            <div className="d-flex ">
            <button className="btn btn-primary" onClick={e=>handleLogin(e)}>Login</button>
            <button className="btn btn-success ml-auto"onClick={handleRegister}>{register.name}</button>
            </div>
            

            {register.show===true?(
                <div>
                    <Register/>
                </div>
            ):(
                null
            )}
        </div>
    );
}

export default Login;


