import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import CardPokemon from './CardPokemon'
import { useAppContext } from '../Context'

const Pokemons = () => {
  const { allPokemons, loadMore, setLoadMore, filtrar, filteredPokes, createPokemonObject } = useAppContext()
  const [busqueda, setBusqueda] = useState("");
  const [state, setstate] = useState({pokemon:{},visible: false})
    
  const filtrarPoke = (terminoBusqueda) => {
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


  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

   createPokemonObject(data.results);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

    const handleClick = (a) => {
      filtrarPoke(a.target.alt)
    }

    const handleInvisible = () => {
        setstate({...state, visible: false})
    }

    useEffect(() => {
      getAllPokemons();
    }, []);

    return (
      <div className="app-contaner">
      <div className="containerInput">
        <input
          className="inputSearch"
          value={busqueda}
          placeholder="Buscar Pokemon"
          onChange={handleChange}
        />
      </div>
  
      <div className="pokemon-container">
        <div className="all-container">
        {filteredPokes?.map((pokemonStats, index) => (
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
        <button className="load-more" onClick={() => getAllPokemons()}>
          Mostrar Mas
        </button>
      </div>
    </div>
    )
}

export default Pokemons

