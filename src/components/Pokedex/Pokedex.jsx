import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";

// CSS import
import "./Pokedex.css";

function Pokedex(){
    return (
        <div className="pokemon-wrapper">
            <h1 id="pokemon-heading">Pokedex</h1>
            <Search/>
            <PokemonList/>
        </div>
    );
}

export default Pokedex;