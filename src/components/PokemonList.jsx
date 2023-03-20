import { useContext } from "react";
import { pokemonContext } from "../context/PokemonContext";
import CardPokemon from "./CardPokemon";
import Loader from "./Loader";

const PokemonList = () => {

    const {allPokemons, loading, filteredPokemons} = useContext(pokemonContext);
    return (
        <>
        {
            loading ? (
                <Loader/>

            ) : (
                <div className="card-list-pokemon container">
                    {
                        filteredPokemons.length ? (
                            <>
                                {filteredPokemons.map (pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
                            
                            </>
                           

                        ) : (
                            <>
                                {allPokemons.map (pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
                            
                            </>
                            
                            
                        )
                    }
                    
        
                </div>



            )
        }
        
        
        </>
    );
}

export default PokemonList;
