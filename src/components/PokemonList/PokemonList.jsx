import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    /* To learn basic of "useEffect"
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    */

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    // POKEMON API(poke.api) CONSTITUTES LIST OF POKEMONS WITH THEIR SKILLS ANS IMAGES
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);   // this downloades list of 20 pokemons
        console.log(response.data);    // gives a data with some count and (result having 20 pokemon)
        const pokemonResults = response.data.results;   // we get the array of pokemons(having only name and URL to fetch data of each pokemon) from results
        // now we iterate each pokemon and downloading its data through its url to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        // axios.all => to get Data when all promise of axios.get completed 
        const pokemonData = await axios.all(pokemonResultPromise);   // array of 20 pokemons detailed data
        console.log(pokemonData);
        // now iterate on the data of each pokemon and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) =>{
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.back_default, 
                types: pokemon.types
            }
        });
        console.log(pokeListResult);
        setPokemonList(pokeListResult);

        setisLoading(false);
    }

    // USE OF USEEFFECT HOOK(EXECUTE A CALLBACK WHEN A COMPONENT IS LOADED)
    useEffect(() =>{
       downloadPokemons();
    }, []);



    return (
        <div className="pokemon-list-wrapper">
        {/* To learn basic of "useEffect"
           <div>
            X: {x} <button onClick={()=>setX(x+1)}>Increase</button>
           </div>
           <div>
            Y: {y} <button onClick={()=>setY(y+1)}>Increase</button>
           </div>    */}

            <div>Pokemon List</div>
            {(isLoading) ? 'Loading...' :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>) 
            }
        </div>
    ) 
}

export default PokemonList;