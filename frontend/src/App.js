import './App.css';
import {useState,useEffect} from 'react'
import { fetchAllRelative } from './apiCalls/apiCalls'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
function App() {
  const [relatives, setRelatives] = useState([])
  useEffect(() => {
    fetchAllRelative().then((data) => {
      console.log(data);
      setRelatives(data)
    }).catch(err => console.log(err))
  }, [])
  return (
    <div >
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
