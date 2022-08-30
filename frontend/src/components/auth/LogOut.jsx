import { useNavigate } from "react-router-dom";

async function LogOut() {
    const navigate = useNavigate();
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
}

export default LogOut;