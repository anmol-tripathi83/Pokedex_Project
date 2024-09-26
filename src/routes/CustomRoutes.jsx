import { Route, Routes } from "react-router-dom";
import Pokedex from "../components/Pokedex/pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";


// In this component we are going to enable react routing
function CustomRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Pokedex/>} />
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
    );
}

export default CustomRoutes;