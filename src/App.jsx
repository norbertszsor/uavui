import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Map from "./components/Map";
import Profile from "./components/user/Profile";
import Drones from "./components/Drones";
import DronesData from "./components/admin/DronesData";
import UsersData from "./components/admin/UsersData";
import NavigationBar from "./components/navigation/NavigationBar";
import AdminNavigation from "./components/admin/AdminNavigation";

function App() {
  
  return(
    <div>
      {localStorage.getItem("JWToken")===null?(
          <Login>{window.history.pushState({},"","/Login")}</Login>
        ):(
          <Router>
            {localStorage.getItem("Role")==="user"?(
              <NavigationBar/>
            ):(
              <AdminNavigation/>
            )}
                       
            <Routes>
                <Route path="/Map" element={<Map/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/Drones" element={<Drones/>}/>
                <Route path="/DronesData" element={<DronesData/>}/>
                <Route path="/UsersData" element={<UsersData/>}/>
            </Routes>
          </Router>
        )
      }
    </div>
  );
}

export default App;
