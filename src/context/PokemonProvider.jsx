import { pokemonContext } from "./PokemonContext";
import { useState, useEffect } from "react";
import { useForm } from "../hook/useForm";


export const PokemonProvider = ({children}) => {
    
    const [offset, setOffset] = useState(0);
    const [allPokemons, setAllPokemons] = useState([]);
    const [globalPokemons, setGlobalPokemons] = useState([]);

    // Utilizar custon hook
    const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});
  

    //Estados para aplicacion simples
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    //Llamada de los 50 pokemones de la api
    const getAllPokemons = async (limit = 50) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(false);
	};

    //Llamar a todos los pokemones

    const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};

//Llamar pokemon por ID

    const getPokemonById = async (id) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

//Filter function

const [typeSelected, setTypeSelected] = useState({
	grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
});

const [filteredPokemons, setFilteredPokemons] = useState([]);

const handleCheckbox = (e) => {
	setTypeSelected({
		...typeSelected,
		[e.target.name]: e.target.checked
	})

	if(e.target){
		const filteredResults = globalPokemons.filter(pokemon => 
			pokemon.types.map(type => type.type.name)
			.includes(e.target.name))
			setFilteredPokemons([
				...filteredPokemons, ...filteredResults
			])
	}else{
		const filteredResults = filteredPokemons.filter(pokemon => 
			!pokemon.types.map(type => type.type.name)
			.includes(e.target.name))
			setFilteredPokemons([...filteredResults])

	}
	
}
    
    
    useEffect(() => {
        getAllPokemons()
    }, [offset]);

    useEffect(() => {
        getGlobalPokemons()
    }, []);

	//Btn cargar mas pokemon

	const onClickLoadMore = () => {
		setOffset(offset + 50)
	}





    return (
        <>
        <pokemonContext.Provider value={{
            valueSearch,
            onInputChange,

            onResetForm,
			allPokemons,
            getPokemonById,
            getAllPokemons,
            getGlobalPokemons,
			globalPokemons,
			onClickLoadMore,
			//loader
			loading,
			setLoading,
			//btn filter
			active,
			setActive,
			//filter container checkbox
			handleCheckbox,
			filteredPokemons
        }}>
            {children}
        </pokemonContext.Provider>
            
        </>
    );
}

export default PokemonProvider;
