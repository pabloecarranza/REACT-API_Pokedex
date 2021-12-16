import React, { useContext, createContext, useState, useMemo, useEffect } from 'react';
import axios from 'axios'

const POKE_URL='http://localhost:3002/api'

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(POKE_URL);
  const [filteredPokes, setfilteredPokes] = useState([])

  function createPokemonObject(results) {
    results.forEach(async (pokemon) => {
      const res = await fetch(
        `${POKE_URL}/${pokemon.name}`
      );
      const data = await res.json();
      setAllPokemons((currentList) => [...currentList, data]);
      setfilteredPokes((currentList) => [...currentList, data]);
      allPokemons.sort((a, b) => a.id - b.id);
    });
  }

  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = allPokemons.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    
    setfilteredPokes(resultadosBusqueda)
  };
  //
  const values = useMemo(() => (
    {   
      allPokemons, setAllPokemons,
      loadMore, setLoadMore,
      filteredPokes, setfilteredPokes,
      createPokemonObject, filtrar,
    }), 
    [allPokemons, loadMore, filteredPokes])
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }
  return context;
}

export default useAppContext;
