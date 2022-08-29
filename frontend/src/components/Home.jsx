import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { allProducts } from "../services/product.service";

function Home() {
    const [ products , setProducts] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [error , setError] = useState(null);

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

    return (
        <>
            <div className="top-header container-fluid">
               <div className="row d-flex justify-content-center p-5">
               <div className="col-sm-6">
                    <h1>online shop !</h1>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident saepe ex animi iusto unde tempora repellat magnam nesciunt consequuntur recusandae earum, explicabo necessitatibus modi sint aliquid cupiditate autem esse. Consequatur?
                    </p>
                    <h1><NavLink style={{textDecoration : 'none'}} to='/product'>Get all product !</NavLink></h1>
                </div>
                <div className="col-sm-6">
                    <img src="https://fakeimg.pl/300/" />
                </div>
               </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>About</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nam porro delectus illum, voluptates explicabo est beatae autem nostrum fugit voluptatem quibusdam ea totam unde animi? Dolorum qui magnam voluptas!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis possimus et odit. Ut doloribus labore officia voluptate delectus, corporis alias excepturi assumenda minus maxime illo earum praesentium autem vitae fugiat?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut optio ea explicabo voluptatum aspernatur aut ab impedit hic, assumenda maiores dolores eum dignissimos saepe quod a reiciendis asperiores! Sit!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Customers</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nam porro delectus illum, voluptates explicabo est beatae autem nostrum fugit voluptatem quibusdam ea totam unde animi? Dolorum qui magnam voluptas!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis possimus et odit. Ut doloribus labore officia voluptate delectus, corporis alias excepturi assumenda minus maxime illo earum praesentium autem vitae fugiat?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut optio ea explicabo voluptatum aspernatur aut ab impedit hic, assumenda maiores dolores eum dignissimos saepe quod a reiciendis asperiores! Sit!
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="container">
	            <div class="row">
                    <h1>Top Products</h1>
                    {loading && (<h1>loading . . .</h1>)}
                    {error && (<h1>{error}</h1>)}
                    {products && (
                        products.map((product , key)=>{
                            if(product.top){
                                console.log(product)
                                return ( 
                                    <>
                                        <div key={key} class="col-md">
                                            <div className="thumb-wrapper">
                                                <div className="img-box">
                                                    <img src="https://fakeimg.pl/300/" className="img-fluid" alt=""/>
                                                </div>
                                                <div className="thumb-content">
                                                    <h4>{product.name}</h4>
                                                    <p className="item-price">{product.price}</p>
                                                    <p className="">{product.description}</p>
                                                    <div className="star-rating">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                                                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                                                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                                                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                                                            <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                                                        </ul>
                                                    </div>
                                                    <a href="#" className="btn btn-primary justify-center">Add to Cart</a>
                                                </div>						
                                            </div>  
                                        </div>
                                    </>
                                )
                            }
                        })
                    )
                    }
                </div>
            </div>
    
            <footer>
                <div className="container-fluid text-light bg-dark p-5">
                    <div className="row">
                        <div className="col-sm-6">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi laudantium optio similique nobis impedit sapiente temporibus, quasi voluptatum accusamus quod officia iusto voluptate adipisci cumque nesciunt libero ducimus expedita odit?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quos optio dolores laboriosam omnis. Quibusdam in corporis fugiat, neque ipsam ullam laborum ratione sed labore est unde laudantium tempora deleniti.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="https://fakeimg.pl/300/" alt="" />
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Home;