import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/auth.service";
import { allOrders } from "../services/order.service";

function Profile(props) {
    const user = props.user ;    
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(false);
    const [ orders , setOrders ] = useState([]);
    const [ error , setError ] = useState(null);

    useEffect(()=>{
        setLoading(true);

        if(!user){
            navigate('/')
            return ;
        }

        allOrders().then((response)=>{
            setLoading(false);
            setOrders(response.data);
        })
        .catch((err)=>{
            setLoading(false);
            setError('intrnal server error')
        })
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

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (<h1>Loading . . . </h1>)}
                                { error ? (<h1>{error}</h1>) :
                                    (
                                        orders.map((order , key)=>{
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <img src="https://fakeimg.pl/300/" width={50} height={50} /><br />
                                                        <b>{order.product.name}</b><br />
                                                        <small>{order.product.price}$</small>
                                                    </td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.total}</td>
                                                    <td>
                                                        <a className="btn btn-success" href="#">upfate</a>
                                                        <a className="btn btn-danger" href="#">remove</a>
                                                    </td>
                                                </tr>
                                            )
                                        })      
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;