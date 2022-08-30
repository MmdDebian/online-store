import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product.service";

function IndexProduct() {
    const {id} = useParams();
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState('');
    const [product , setProduct] = useState([]);
    let [quantity , setQuantity ] = useState(1);
    
    useEffect(()=>{
        setLoading(true);
        getProductById(id)
        .then((response)=>{
            console.log(response.data)
            setLoading(false)
            setProduct(response.data)
        })
        .catch((err)=>{
            setLoading(false);
            setError('Product is not found !')
        })
    },[])


    const addQuantity = ()=>{
        quantity = quantity + 1
        setQuantity(quantity);
    }

    const lowQunatity = ()=>{
        quantity = quantity - 1
        if(quantity < 1){
            return quantity = 1
        }
        setQuantity(quantity);
    }

    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                    {loading && (<h1>Loading . . . </h1>)}
                    {error ? (<h1>{error}</h1>) : (
                        <>
                            <div class="card m-5">
                                <div class="card-header">
                                    <img src="https://fakeimg.pl/300/" alt="" />
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{product.name}</h5>
                                    <p class="card-text">description : {product.description}</p>
                                    <p class="card-text">price : {product.price}</p>
                                    <p class="card-text text-success">discount : {product.discount}</p>
                                    <p class="card-text">color : {product.color}</p>
                                    <p class="card-text">size {product.size}</p>
                                </div>
                                <div className="d-flex">
                                    <button className="btn btn-info" onClick={addQuantity}>+</button>
                                    <h1>{quantity}</h1>
                                    <button className="btn btn-info" onClick={()=>{setQuantity(lowQunatity)}}>-</button>
                                </div>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    add cart
                                </button>
                            </div>
                        </>   
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndexProduct;