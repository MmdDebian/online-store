import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/auth.service";

function Profile(props) {
    
    const user = props.user ;    
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/')
            return ;
        }
    },[])

    
    const handleLogOut = ()=>{
        logOut()
        window.location.reload();
        navigate('/');
    }

    return ( 
        <>
            <div className="container-fluid bg-dark text-light p-5">
                <div className="row">
                    <div className="col-sm-6">
                       {user && (
                         <>
                            <h1>name : {user.name}</h1>
                            <h1>email : {user.email}</h1>
                         </>  
                       ) 
                       }
                    </div>
                    <div className="col-sm-6">
                        <button onClick={handleLogOut} className="btn btn-danger">Log out !</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;