import React, { useEffect, useState } from "react";
import Pokemons from "./components/Pokemons";
import axios from 'axios'

const App = () => {
  const POKE_URL='http://localhost:3002/api'

  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokes, setfilteredPokes] = useState([])
  const [loadMore, setLoadMore] = useState(POKE_URL);
  const [busqueda, setBusqueda] = useState("");

  
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
          <Pokemons allPokemons={filteredPokes}/>
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Mostrar Mas
        </button>
      </div>
    </div>
  );
};

export default App;
