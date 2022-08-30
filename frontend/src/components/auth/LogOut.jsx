import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    },[])
    
    return null ;
}

export default LogOut;