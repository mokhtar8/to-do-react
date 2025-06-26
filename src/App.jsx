import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Homep from './Homep';
import SignIn from './Signin';
import Signup from './Signup';
import Gofortask from './Gofortask';
import Upcoming from './upcoming';
import Today from './Today';
import Calendarpage from './Calendarpage';


export default function App() {


  return (
   
      <Router>

        <Routes>
          <Route path='/' element={<Homep/>} />
            <Route path="/Sign In" element={<SignIn/>} />
            <Route path="/Sign up" element={<Signup/>} /> 
            <Route path="/Gofortask" element={<Gofortask />} /> 
            <Route path="/Upcoming" element={<Upcoming />} /> 
            <Route path="/Today" element={<Today />} /> 
            <Route path="/Calendarpage" element={<Calendarpage />} /> 
   
        </Routes>
    
    </Router>
  )
}
