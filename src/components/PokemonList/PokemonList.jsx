/*
import { useEffect, useState } from "react";
import axios from 'axios';
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    /* To learn basic of "useEffect"
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // POKEMON API(poke.api) CONSTITUTES LIST OF POKEMONS WITH THEIR PROPERTIES ANS IMAGES
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);   // this downloades list of 20 pokemons
        console.log(response.data);    // gives a data with some count and (result having 20 pokemon)

        const pokemonResults = response.data.results;   // we get the array of pokemons(having only name and URL to fetch data of each pokemon) from results
        
        // using next and prev property of response.data to show next list of 20 pokemon and previous list of 20 pokemon
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

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

        setIsLoading(false);
    }

    // USE OF USEEFFECT HOOK(EXECUTE A CALLBACK WHEN WEBPAGE IS LOADED AND POKEDEXURL CHANGES)
    useEffect(() =>{
       downloadPokemons();
    }, [pokedexUrl]);



    return (
        <div className="pokemon-list-wrapper">
        {/* To learn basic of "useEffect"
           <div>
            X: {x} <button onClick={()=>setX(x+1)}>Increase</button>
           </div>
           <div>
            Y: {y} <button onClick={()=>setY(y+1)}>Increase</button>
           </div>    */

{/*
            <div className="pokemon-wrap">
                {(isLoading) ? 'Loading...' :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>) 
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onclick={setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onclick={setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    ) 
        */}
//}

//export default PokemonList;









// Correct code check what is wrong in above code , there is react infinite loop occurring
import { useEffect, useState } from "react";
import axios from 'axios';
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    /*
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');   
    */

    // To remove state var we use single object in which we store object variable as a state var (see below) here pokemonListState is a object and setPokemonListState is used to update some key of object
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons() {
        setPokemonListState((state) =>({...state, isLoading:true}));  // setIsLoading(true);
        const response = await axios.get(pokemonListState.pokedexUrl);     //const response = await axios.get(pokedexUrl); // this downloads list of 20 pokemons

        const pokemonResults = response.data.results;  // we get the array of pokemons from result

        console.log("response data is:",response.data);
        setPokemonListState((state) =>({   // To avoid the problem caused due to multiple time changes in object state before rendering(it takes only one change) so to change state multiple time before renderig we pass a callback function which expect a object and we change that object and pass that callback to set method of aur state object(in useEffect) and set method set the value of state object to our previous object which we wnt to change
            ...state,
            nextUrl:response.data.next,     // setNextUrl(response.data.next);  
            prevUrl:response.data.previous  // setPrevUrl(response.data.previous);
        }));     

        // iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
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

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrap">
                {(pokemonListState.isLoading) ? 'Loading....' :      
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)         
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.prevUrl})}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;











/*  RETURN PREVIOUS CODE PART(WITHOUT CLEENUP)
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrap">
                {(isLoading) ? 'Loading....' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
*/