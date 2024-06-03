import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import {Routes,Route,Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';


function App() {
      const {user} = useContext(AuthContext);
  return (
    <div className="App">
    

     <Routes>
      <Route path='/login' element={  <Login/>}></Route>
      <Route path='/*' element={<Signup/>}/>
      <Route path='/profile' element={ user ? <Profile/> : <Login/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
