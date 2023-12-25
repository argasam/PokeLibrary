import React from "react";
import { useState } from 'react';
import CatchPokemon from './CatchPopUp'
import ClosePopUp from './RemovePopUp'
import { ReactComponent as Pokeball } from '../img/pokeball.svg'
import darkpoke from '../img/darkpoke.svg'

const PopUp = ({ closePopup, pokemon, user, updateOwnedPokemon}) => {
    const [randomNumber, setRandomNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    function checkPokemon(pokemonName, user) {
        return(
            user.ownedPokemon.includes(pokemonName)
        )
    }
    
    const handleDeletePokemon = () => {
        // Update the user's ownedPokemon list
        const newOwnedPokemon = user.ownedPokemon.filter((ownedPokemon) => ownedPokemon !== pokemon.name);
        updateOwnedPokemon(newOwnedPokemon);
      };

    const generateRandomNumber = async () => {
        setOpen(true)
        setIsLoading(true);
        
        let random = null;
        setRandomNumber(random)

        setTimeout(() => {
            random = Math.floor(Math.random() * 100) + 1;
            setRandomNumber(random)
        }, 1000);
    };

    const calculateStatPercentage = (statValue) => {
        return (statValue / 255) * 100; // Assuming the max stat value is 100
      };

    const moveNames = pokemon.moves.slice(0,5).map((ability) => ability.move.name);  
    const abilityNames = pokemon.abilities.map((ability) => ability.ability.name);
    const typeNames = pokemon.types.map((ability) => ability.type.name);

    return(
        <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
            <div  className="overflow-clip bg-clip-content flex flex-col w-1/5 h-auto border-2 rounded-xl bg-white xs:w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/3 ">
                <div className=" flex flex-row justify-between p-2">
                    <h1>Pokemon Detail</h1>
                    <button className="" onClick={closePopup}>❌</button>
                </div>
                <div className="mt-0 border-2"></div>
                <div className="relative flex flex-col bg-green-500">
                    <div className="flex flex-row justify-center mx-auto mt-2 bg-slate-400 w-1/4 rounded-full mix-blend-darken">
                        <h1>#{pokemon.id}</h1>
                    </div>
                    <h2 className="capitalize flex flex-row justify-center">{pokemon.name}</h2>
                    <div className="relative flex flex-row justify-center h-32">
                        <img className="absolute -bottom-6 h-40" src={pokemon.sprites.other.home.front_default || darkpoke} alt={pokemon.name} />
                    </div>
                    <div className="bg-slate-50 py-2 px-4 pt-3 rounded-t-md">
                        
                        <div className="relative flex flex-row justify-center my-3">
                            <p className="capitalize mx-2 text-2xl font-bold">Base Stats</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-5">

                        

                            <p>HP</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                                <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[0].base_stat)}%` }}
                                ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[0].base_stat}</p>
                            </div>
                            
                            <p>ATK</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                                <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[1].base_stat)}%` }}
                                ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[1].base_stat}</p>
                            </div>

                            <p>DEF</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                                <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[2].base_stat)}%` }}
                                ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[2].base_stat}</p>
                            </div>

                            <p>SPC-ATK</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                                <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[3].base_stat)}%` }}
                                ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[3].base_stat}</p>
                            </div>

                            <p>SPD-DEF</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                            <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[4].base_stat)}%` }}
                            ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[4].base_stat}</p>
                            </div>

                            <p>SPD</p>
                            <div className="h-3 bg-gray-300 rounded-full">
                            <div
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${calculateStatPercentage(pokemon.stats[5].base_stat)}%` }}
                            ></div>
                            </div>
                            <div class="flex flex-row justify-end align-center">
                                <p>{pokemon.stats[5].base_stat}</p>
                            </div>
                        </div>

                        <div className="relative flex flex-row justify-center my-3">
                            <p className="capitalize mx-2 text-2xl font-bold">Additional Information</p>
                        </div>

                        <div className="relative flex flex-row justify-center">
                            <p className="capitalize mx-2">Weight: {pokemon.weight}</p>
                            <p className="capitalize">Height: {pokemon.height}</p>
                        </div>
                        <div className="relative flex flex-row justify-center">
                            <p className="capitalize mx-2">Type: {typeNames.join(', ')}</p>
                        </div>
                        <div className="relative flex flex-row justify-center">
                            <p className="capitalize mx-2">Ability: {abilityNames.join(', ')}</p>
                        </div>
                        <div className="relative flex flex-row justify-center">
                            <p className="capitalize mx-2">Move: {moveNames.join(', ')}</p>
                        </div>
                        
                        {!checkPokemon(pokemon.name, user) && <button 
                        onClick={async ()=>{
                            await generateRandomNumber();                      
                        }}
                        className="flex flex-row justify-center px-2 mb-2 mt-4 mx-auto rounded-lg bg-slate-400">Get Pokemon</button>}
                        
                        {checkPokemon(pokemon.name, user) && <button className="flex flex-row justify-center px-2 my-2 mx-auto rounded-lg bg-red-600" 
                        onClick={()=>{
                            setOpen2(true);
                            handleDeletePokemon();
                            }}>🗑️ Remove Pokemon</button>}

                        {randomNumber && open 
                            ? <CatchPokemon
                                stopLoading={() => {setIsLoading(false)}}
                                closepopup={() => {
                                    setOpen(false);
                                    closePopup();
                                }}
                                closeLittlePop={() => {
                                    setOpen(false)
                                }}
                                result={randomNumber}
                                user={user}
                                updateOwnedPokemon={updateOwnedPokemon}
                                pokemon={pokemon.name}
                                />
                            : null}
                        {open2
                            ?<ClosePopUp
                                closepopup={() => {
                                    setOpen2(false);
                                    closePopup();
                                }}
                                />
                            :null}
                    </div>
                </div>
            </div>

            <div>
                {isLoading && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-transparent p-6 rounded-md">
                    <svg className="animate-spin mt-5">
                        <Pokeball/>
                    </svg>
                        </div>
                      </div>
                )}
            </div>
        </div>
    )
}

export default PopUp