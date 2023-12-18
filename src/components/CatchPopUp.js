import React from "react";
import { useEffect } from "react";

const CatchPokemon = ({stopLoading,  closepopup, closeLittlePop, result, user, updateOwnedPokemon, pokemon}) => {
    
    
    const handleAddPokemon = () => {
        const newOwnedPokemon = [...user.ownedPokemon, pokemon];
        updateOwnedPokemon(newOwnedPokemon);
      };

    const handleButtonClick = () =>{
        closepopup();
    }

    const handleButtonClickonFailed = () =>{
        closeLittlePop();
    }

    useEffect(() => {
      if (result > 50) {
          handleAddPokemon();
      } else {
          console.log(result)
      }
      stopLoading();
    }, [result])
      
    return(
        <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-between items-center bg-white aspect-[4/3] h-1/4 rounded-full">
                {result > 50 
                            ? 
                            
                                <p className="mt-20 text-4xl font-bold text-green-500">Berhasil</p>
                            
                            : 
                                <p className="mt-20 text-4xl font-bold text-red-500">Gagal</p>
                }
                {result > 50 
                            ? 
                            
                                <button className="my-4 bg-white border-2 border-green-500 p-2 rounded-full" onClick={handleButtonClick}>Close</button>
                            
                            : 
                                <button className="my-4 bg-white border-2 border-green-500 p-2 rounded-full" onClick={handleButtonClickonFailed}>Close</button>
                }
                
            </div>
                
        </div>
    )
}

export default CatchPokemon