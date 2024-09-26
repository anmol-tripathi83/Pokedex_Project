import { Link } from 'react-router-dom';
import './App.css'
//import Pokedex from './components/Pokedex/pokedex';
import CustomRoutes from './routes/customRoutes';


function App() {

  return (
    <div className='outer-pokedex'>
    {/** <Pokedex/> */}

    {/** HERE WE CAN USE NAVBAR COMPONENT WHICH IS SAME FOR ALL PAGES OPENED BY CUSTOMROUTES(HAVING CONDITION FOR DIFFERENT OPENING OF COMPONENTS) just like pokedex heading here */}
    <h1 id="pokemon-heading">
      <Link to="/">Pokedex</Link>
    </h1>

    {/** TO ENABLE CUSTOMROUTES IN WHICH WHICH PATH RENDERS WHICH COMPONENT THEREFORE WE NOW USE CUSTOMROUTES COMPONENT TO DO SO */}  
    <CustomRoutes/>
    </div>
  )
}

export default App
