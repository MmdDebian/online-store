import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { allProducts } from "../services/product.service";

function Product() {
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState('');
    const [products , setProducts] = useState([]);

    useEffect(()=>{
        setLoading(true);
        allProducts()
        .then((response)=>{
            console.log(response.data)
            setLoading(false)
            setProducts(response.data)
        })
        .catch((err)=>{
            setLoading(false);
            setError('internal server error')
        })
    },[])


    if(loading){
        return <h1>Loading . . . </h1>
    }

    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                    {error && (<h1>{error}</h1>)}

                    {products&& (
                        products.map(product=>{
                            return (
                                <div class="card m-5">
                                    <div class="card-header">
                                        <img src="https://fakeimg.pl/300/" alt="" />
                                    </div>
                                    <div class="card-body">
                                        <NavLink  to={`/product/${product.id}`}><h5 class="card-title">{product.name}</h5></NavLink>
                                        <p class="card-text">description : {product.description}</p>
                                        <p class="card-text">price : {product.price}</p>
                                        <p class="card-text text-success">discount : {product.discount}</p>
                                        <p class="card-text">color : {product.color}</p>
                                        <p class="card-text">size {product.size}</p>
                                        <NavLink className='btn btn-info' to={`/product/${product.id}`}>see product</NavLink>
                                    </div>
                                </div>
                            )
                        })   
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;