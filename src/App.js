import React from "react";
import Pokemons from "./components/Pokemons";
import { AppContextProvider } from './store/Context';

const App = () => {

  return (
  <AppContextProvider>
    <Pokemons/>
  </AppContextProvider>
  );
};

export default App;

