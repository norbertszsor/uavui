import { Link } from "react-router-dom";

const AdminNavigation = () =>{

    const handleLogout = e =>{
        localStorage.clear();
        window.location.reload();
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

        <div class="container-fluid">
            <a className="navbar-brand" href="#">ADMINPANEL</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
           
            <ul className="navbar-nav me-auto">
                <Link className="nav-item nav-link" to="/DronesData"> DRONES </Link>
                <Link className="nav-item nav-link" to="/UsersData"> USERS </Link>
            </ul>
           
            <div className="navbar-nav ml-auto">
                <button className="btn btn-danger nav-link "onClick={e=>handleLogout(e)}>Logout</button>
            </div>
            
            
            
            </div>
            
        </div>
        </nav>
    );
   
};

export default AdminNavigation;