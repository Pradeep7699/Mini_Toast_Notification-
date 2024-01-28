import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
// import './App.css';
import FirstComponent from '../FirstComponent';
import SecondComponent from '../SecondComponent';
import ThirdComponent from '../ThirdComponent';
import Navbar from './Navbar';

function Router() {
  
  return (
    <div className="App">   
      <BrowserRouter> 
      <Navbar/>
    <Routes>
      <Route path='/component-1' element={<FirstComponent/>}></Route> 
      <Route path='/component-2' element={<SecondComponent/>}></Route> 
      <Route path='/component-3' element={<ThirdComponent/>}></Route> 
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}
export default Router;