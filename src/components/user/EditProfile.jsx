import { useState } from "react";


const EditProfile = () =>{

    const [data, setData] = useState({
        name: "",
        email: "",
        isActive: true,
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
        const reguestUrl = "https://localhost:44308/api/User/EditUser";
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
                <div className="btn btn-info m-1">Edit profile Form</div>
                        <div className="form-group m-2">
                        
                            <label className="col-form-label " htmlFor="email">Type new email:</label>
                            <input className="form-control form-control-sm" type="email" name="email" id="emial" onChange={e=>setData({...data, email: e.target.value})}/>

                            <label className="col-form-label " htmlFor="name">Type new user name:</label>
                            <input className="form-control form-control-sm" type="text" name="name" id="name" onChange={e=>setData({...data, name: e.target.value})}/>
                                               
                            <button className="btn btn-danger mt-1" onClick={e=>handleEdit(e)}>Submit</button>
                        </div>
                </div>
        
    );
}

export default EditProfile