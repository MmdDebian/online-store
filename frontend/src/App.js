import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Content from './components/Content';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { getUser } from './services/users.service';
import Profile from './components/Profile';

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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to='/product'>Products</NavLink>
            </li>
            {
              user ? (
                <>
                  <li className="nav-item">
                    <NavLink className='nav-link' to='/profile'>Profile</NavLink>
                  </li>
                  {
                    user.role == 'ADMIN' && (
                      <NavLink className='nav-link' to='/admin'>Admin</NavLink>
                    )
                  }
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className='nav-link' to='/auth/register'>Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link' to='/auth/login'>Login</NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/content' element={<Content/>} />
        <Route path='/auth'>
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/profile' element={<Profile  user={user} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
