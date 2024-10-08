import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("response is",response);
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`); 
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypes.data.pokemon
        });

        setPokemonListState({...pokemonListState, type:response.data.types ? response.data.types[0].type.name : ''});
    }

    const {pokemonListState,setPokemonListState} = usePokemonList();

    useEffect(() =>{
        downloadPokemon();
        console.log("list is:",pokemon.types,pokemonListState);
    },[]);
    return [pokemon];
}

export default usePokemonDetails;