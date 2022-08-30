import { NavLink, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from './services/users.service';
import Home from './components/Home';
import About from './components/About';
import OrderModel from './components/modals/OrderModal';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Product from './components/products/Product';
import IndexProduct from './components/products/indexProduct';


function App() {
  const [user , setUser] = useState(null);

  useEffect(()=>{
    getUser().then((response)=>{
      console.log(response)
      setUser(response.data);
    })
    .catch(()=>setUser(null))
  },[])
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" style={{border:'none'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to='/product'>Products</NavLink>
            </li>
          </ul>
          {
            user ? (
              <>
              <ul class="navbar-nav ">
                <li class="nav-item">
                    <NavLink className='nav-link' to='/profile'>
                      <i class="fa fa-user"></i>
                    </NavLink>
                </li>
                {
                  user.role == 'ADMIN' && (
                    <NavLink className='nav-link' to='/admin'>
                      <i class="fa fa-admin"></i>
                    </NavLink>
                  )
                }
                <li class="nav-item">
                  <a class="nav-link"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa fa-shopping-cart">
                    </i>
                  </a>
                </li>
              </ul>
              </>
            ) : (
              <>
              <ul className='navbar-nav'>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/auth/register'>Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/auth/login'>Login</NavLink>
                </li>
              </ul>
              </>
            )
          }
        </div>
      </div>
    </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<IndexProduct />} />
        <Route path='/auth'>
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/profile' element={<Profile  user={user} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <OrderModel user={user} />
    </>
  );
}

export default App;
