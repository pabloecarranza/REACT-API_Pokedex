import React from "react";

const Pokemon = ({image, name, type, handleClick }) => {




    return (    
        <button className="btn" id={name} onClick={(a)=> handleClick(a)}>
        <div className=" thumb-container">
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Tipo: {type}</small>
                
            </div>
        </div>
        </button>
    )
}

export default Pokemon
