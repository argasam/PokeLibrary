import React from "react";
import darkpoke from '../img/darkpoke.svg'
import { useEffect } from 'react';

const PokemonCard = ({id, name, type1, type2, image, key, onClick, user}) => {
    function checkPokemon(pokemonName, user) {
        return(
            user.ownedPokemon.includes(pokemonName)
        )
    }

    useEffect(() => {
        if (onClick === true) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    }, [onClick]);
        
    return(
        <div className='cards flex flex-col justify-around
        w-[200px] h-[300px] m-2 px-5 py-2 rounded-lg
        border border-blue-500
        
        '
        onClick={onClick}>
            <div className="h-1/5 flex flex-row justify-between mt-auto">
              <p className='text-xl font-bold'>#{id}</p>
            
              {checkPokemon(name, user)
                ? <p className="bg-green-500 rounded-full h-4 w-4 mt-[2px]"></p>
                : <p className="bg-red-500 rounded-full h-4 w-4 mt-[2px]"></p>}
            </div>
            <div className='flex justify-center h-1/2'>
              <img className='' src={image || darkpoke} alt={name}></img>
              
            </div>
            <div className='capitalize'>
                <span >{name}</span>
                <div className="flex flex-row bold text-sm capitalize">
                    <h3 className="rounded-full w-1/2 flex items-center justify-center bg-blue-500 content-center mr-2 my-2 p-2">{type1}</h3>
                    {type2 && <h4 className='rounded-full w-1/2 flex items-center justify-center bg-blue-500 my-2 p-2'>{type2}</h4>}
                </div>
                
            </div>
        </div>
    )
}

export default PokemonCard