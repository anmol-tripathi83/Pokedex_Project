import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
             
            setPokemonListState((state) =>({...state, isLoading:true}));  // setIsLoading(true);
            const response = await axios.get(pokemonListState.pokedexUrl);     //const response = await axios.get(pokedexUrl); // this downloads list of 20 pokemons

            const pokemonResults = response.data.results;  // we get the array of pokemons from result

            console.log("response is a:",response.data.pokemon);
            setPokemonListState((state) =>({   // To avoid the problem caused due to multiple time changes in object state before rendering(it takes only one change) so to change state multiple time before renderig we pass a callback function which expect a object and we change that object and pass that callback to set method of aur state object(in useEffect) and set method set the value of state object to our previous object which we wnt to change
                ...state,
                nextUrl:response.data.next,     // setNextUrl(response.data.next);  
                prevUrl:response.data.previous  // setPrevUrl(response.data.previous);
            }));

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
            console.log(pokemonData); 

            // now iterate on the data of each pokemon, and extract id, name, image, types

            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name, 
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                    types: pokemon.types
                }
            });
            console.log(pokeListResult);
            setPokemonListState((state)=>({
                ...state, 
                pokemonList:pokeListResult,   // setPokemonList(pokeListResult);
                isLoading:false     //setIsLoading(false);
            }));   
    }   

    useEffect(() =>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);

    return {pokemonListState,setPokemonListState};
}

export default usePokemonList;