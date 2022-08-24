import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Content from './components/Content';
import Register from './components/Register';

function App(props) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/content' element={<Content/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;
