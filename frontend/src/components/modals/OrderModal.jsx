import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { allOrders } from "../../services/order.service";


function Modal(props) {
    const user = props.user ;
    const [ loading , setLoading ] = useState(false);
    const [ orders , setOrders ] = useState([]);
    const [ error , setError ] = useState(null);

    useEffect(()=>{
        setLoading(true);

        allOrders().then((response)=>{
            setLoading(false);
            setOrders(response.data);
        })
        .catch((err)=>{
            setLoading(false);
            setError('intrnal server error')
        })
    },[])

    const removeHandle = async (id)=>{
        console.log(id)
    }

    return ( 
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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
                                                            <button onClick={()=>{removeHandle(order.id)}} className="btn btn-danger" >Remove</button>
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
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success">Payment</button>
                </div>
                </div>
            </div>
            </div>
        </>
     );
}

export default Modal;