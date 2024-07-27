import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
function App() {

  return (

     <BrowserRouter>
      <Routes>
        <Route path="/" element={< Signup/>}></Route>
      </Routes>


      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
