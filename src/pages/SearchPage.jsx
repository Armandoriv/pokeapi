import { useContext } from "react";
import { pokemonContext } from "../context/PokemonContext";
import { useLocation } from "react-router-dom";
import CardPokemon from "../components/CardPokemon";

const SearchPage = () => {

    const location = useLocation()

    const {globalPokemons} = useContext(pokemonContext);

    const filteredPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()))

console.log(filteredPokemons)
    return (
        <div className="container">
            <p className="p-search">
                se encontraron <span>{filteredPokemons.length}</span> resultados:
            </p>
            <div className="card-list-pokemon container">
                {filteredPokemons.map(pokemon => (
                    <CardPokemon pokemon={pokemon} key={pokemon.id}/>
                ))}

            </div>
        
            
        </div>
    );
}

export default SearchPage;
