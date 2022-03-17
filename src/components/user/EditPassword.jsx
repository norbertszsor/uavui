import { useState } from "react";


const EditPassword = () =>{

    const [data, setData] = useState({       
            oldPassword: "",
            newPassword: "s",
            confirmNewPassword: "" 
        })

    

    const handleEdit = async e =>{
       
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
        const reguestUrl = "https://localhost:44308/api/User/ChangePassword";
        const response = await fetch(reguestUrl, requestOptions);
        const responseValue = await response.text();
        
        console.log(response);
        await console.log(response.value);
        
        if(responseValue!==null){
            await window.alert(responseValue);
        }else{
            window.alert(responseValue);
        }

    }

    return(
       
                <div className="card text-white bg-primary mt-3 pt-2"> 
                <div className="btn btn-info m-1">Change Password Form</div>
                        <div className="form-group m-2">
                        
                            <label className="col-form-label " htmlFor="password">Type old password:</label>
                            <input className="form-control form-control-sm" type="password" name="password" id="passsword" onChange={e=>setData({...data, oldPassword: e.target.value})}/>

                            <label className="col-form-label " htmlFor="password1">Type new password</label>
                            <input className="form-control form-control-sm" type="password" name="password" id="passsword1" onChange={e=>setData({...data, newPassword: e.target.value})}/>

                            <label className="col-form-label " htmlFor="password2">Confirm new password</label>
                            <input className="form-control form-control-sm" type="password" name="password2" id="passsword2" onChange={e=>setData({...data, confirmNewPassword: e.target.value})}/>
                           
                            
                                                      
                            <button className="btn btn-secondary mt-1" onClick={e=>handleEdit(e)}>Submit</button>
                        </div>
                </div>

    );
}

export default EditPassword 