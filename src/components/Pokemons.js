import React, {useState} from "react";
import Pokemon from "./Pokemon";
import CardPokemon from './CardPokemon'
const Pokemons = ({allPokemons}) => {

    const [state, setstate] = useState({
        pokemon:{},
        visible: false
    })

    
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = allPokemons?.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda?.toLowerCase())
      ) {
        return elemento;
      }
    });
    setstate({...state, pokemon: resultadosBusqueda, visible: true})
  };



    const handleClick = (a) => {
        filtrar(a.target.alt)
    }

    const handleInvisible = () => {
        setstate({...state, visible: false})
    }

    

    return <div>
        {allPokemons?.map((pokemonStats, index) => (
            <Pokemon
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              handleClick={handleClick}
            />
          ))}
         {state.visible && <>
            <CardPokemon pokemon={state.pokemon} handleInvisible={handleInvisible}/>

          </>}
        </div>
  
}

export default Pokemons
