import React from "react";

const CardPokemon = ({pokemon, handleInvisible}) => {   
    console.log('pokemon', pokemon)
    return (
        <button className="btnCard" onClick={()=> handleInvisible()}>
        <div className=" thumb-containerCard">
        <h1> {pokemon[0]?.name}</h1>
        <img id="thumbImg" src={pokemon[0]?.sprites.other.dream_world.front_default} alt={pokemon[0]?.name} />
        <h3>Tipo: {pokemon[0]?.types[0].type.name}</h3>
        <h3 id="ability">Habilidad: {pokemon[0]?.abilities[0].ability.name}</h3>
        
        <div>Cerrar</div>
        </div>
        </button>
    )
}

export default CardPokemon
