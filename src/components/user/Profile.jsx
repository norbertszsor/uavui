import react, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";

const Profile = () =>{


    const [data, setData] = useState(null);
    const [visible, setVisible] = useState({show: false, name: "Edit Profile"});
    const [visible1, setVisible1] = useState({show: false, name: "Change Password"});

    useEffect(()=>{

        const requestUrl = "https://localhost:44308/api/User/ProflieDetails"
            
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
    },[])

    const handleVisible = e =>{
                  
        if(visible.show){
                setVisible({show: false, name: "Edit Profile"})
                console.log(visible)

            }else{
                setVisible({show: true, name: "Close"})
                console.log(visible)
            }
    }
    const handleVisible1 = e =>{
                  
        if(visible1.show){
                setVisible1({show: false, name: "Change Password"})
                console.log(visible1)

            }else{
                setVisible1({show: true, name: "Close"})
                console.log(visible1)
            }
    }

    return(
        <div className="col-3 card-mb-3 mt-2">
            {data!==null?(
                <div>
                    <div className="card-header">User Profile:</div>
                    <div className="list-group-item list-group-item-action">Your Email: {data.email}</div>
                    <div className="list-group-item list-group-item-action">Your Name: {data.name}</div>
                </div>             
                
            ):(
                <div>Fetch error</div>
            )}
            
            {visible.show===true?(
                <div>
                    <EditProfile/>
                </div>
            ):(
                null
            )}
            {visible1.show===true?(
                <div>
                    <EditPassword/>
                </div>
            ):(
                null
            )}
            <div className="d-flex mt-1">
                <button className="btn btn-primary" onClick={handleVisible}>{visible.name}</button>
                <button className="btn btn-success ml-auto" onClick={handleVisible1}>{visible1.name}</button>
            </div>
            
        </div>

    );
}

export default Profile;