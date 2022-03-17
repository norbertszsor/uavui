import { popup } from "leaflet";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../styles/Map.css";


const Map = () =>{
 
    const [markers, setMarkers] = useState(null);
    const [time, setTime] = useState(null);
    const [visible, setVisible] = useState({show: false, name: "Show"});
    const droneData = JSON.parse(localStorage.getItem("Drones")); 
    const itemList = []
    const droneList = []
    useEffect(()=>{
        
        
        const interval = setInterval(()=>{
            setTime(time=>setTime(!time));
        
            const requestUrl = "https://localhost:44308/api/GeoLocation/GetUserLocations";
            
            const requestOptions = {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 
                'application/json',
                'Access-Control-Allow-Origin':" *",
                "Authorization": "Bearer "+localStorage.getItem("JWToken")},
            };

            fetch(requestUrl,requestOptions)
                .then(response => {
                console.log(response);
                return response.json();
            })
            .then( data => {
                setMarkers(data);
            })
            
        },1000);


            

        return()=> clearInterval(interval);
    },[]);
    const handleVisible = (index) =>{
        
        const divStyle = document.getElementById(index)
        
        if(divStyle.style.display==="none"){

            divStyle.style.display = "block"

        } else{

            divStyle.style.display = "none"
        } 
        
    }
    
    return(
        
        <div className="container">
            {markers!==null?(
                markers.forEach((element,index) =>{
                    itemList.push(
                        <Marker position={[element.latitude, element.longitude]}>
                            <Popup>
                                <div>
                                    <div>Name: {droneData[index].customName}</div>
                                    <div>AltitudeGPS: {element.altitudeGPS} m</div>
                                    <div>AltitudeBMP: {element.altitudeBMP} m</div>
                                    <div>Speed: {element.speed} km/s</div>
                                    <div>Vertical Speed: {element.verticalSpeed} km/s</div>
                                </div>                             
                            </Popup>
                        </Marker>
                    )
                    droneList.push(
                       
                            <div className="col-4 mt-3 ">
                            <div className="list-group-item list-group-item-action m-1 p-1" >Drone: {droneData[index].customName}</div>
                            
                                <div className="list-group m-1 p-1" id={index} style={{display:"none"}}>
                                    <div className="list-group-item list-group-item-action ">Name: {droneData[index].customName}</div>
                                    <div className="list-group-item list-group-item-action ">Model: {droneData[index].model}</div>
                                    <div className="list-group-item list-group-item-action ">Air Temperature: {element.airTemperature} C</div>
                                    <div className="list-group-item list-group-item-action ">Position: [{element.latitude} lat, {element.longitude} long]</div>                               
                                    <div className="list-group-item list-group-item-action ">AltitudeGPS: {element.altitudeGPS} m</div>
                                    <div className="list-group-item list-group-item-action "> AltitudeBMP: {element.altitudeBMP} m</div>
                                    <div className="list-group-item list-group-item-action ">Speed: {element.speed} km/s</div>
                                    <div className="list-group-item list-group-item-action ">Vertical Speed: {element.verticalSpeed} km/s</div>
                                    
                                </div>
                                
                             
                            <button className="btn btn-primary container m-1 p-1"onClick={()=>handleVisible(index)}>Show</button>                            
                        </div>
                      
                        
                    )
                })
            ):(null)}
            <div className="m-3 justify-content-center">
                <MapContainer center={[52.237049, 19.017532]} zoom={6} scrollWheelZoom={false}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {itemList}
                </MapContainer>
            </div>
            <div className="d-flex justify-content-start  flex-wrap">
                {droneList}
            </div>
            
            
            
        </div>
    );
};

export default Map;