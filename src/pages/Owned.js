import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PopUp from '../components/PopUp';
import { getPokemon } from '../services/pokemonSvc';
import { Navbar } from '../components/Navbar';
import { ReactComponent as Pokeball } from '../img/pokeball.svg'

const Owned = () => {
  const savedData = localStorage.getItem('user-save-data');
  const [listPokemon, setListPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  }

  
  const intiialLoad = async () => {
    if (savedData) {
      const userData = JSON.parse(savedData);
      clearList();
      loadPokemon(userData.ownedPokemon);
    }
    setLoading(false)
  }

  const clearList = () => {
    setListPokemon([]);
  }

  const loadPokemon = async (data) => {
    function toListPokemon(list) {
      list.forEach(async (pokemon) => {
        const data = await getPokemon(pokemon);
        setListPokemon(currentList => [...currentList, data])
        listPokemon.sort((a, b) => a.id - b.id)
      });
    }
    toListPokemon(data);
  }

  
  const updateOwnedPokemon = (newOwnedPokemon) => {
    const userData = JSON.parse(savedData);
    userData.ownedPokemon = newOwnedPokemon;
    localStorage.setItem('user-save-data', JSON.stringify(userData));
  };
  
  useEffect(() => {
    intiialLoad();
  },[savedData]);

  return (
    <div className=''>
    < Navbar />
    <div className='mt-1 mb-10 bg-gray-600 h-2'></div>
    
    <div className='flex flex-wrap items-center justify-center m-2'>
      {listPokemon.map((pokemon, index) => 
        <PokemonCard
        id = {pokemon.id}
        name= {pokemon.name}
        type1 = {pokemon.types[0].type.name}
        type2 = {pokemon.types.length > 1 ? pokemon.types[1].type.name : null }
        image ={pokemon.sprites.other.home.front_default}
        key= {index}
        onClick={() => handleCardClick(pokemon)}
        user={JSON.parse(savedData)}
        />
        )}
    </div>
    {open 
        ? <PopUp closePopup={() => setOpen(false)} 
                pokemon={selectedPokemon} 
                user={JSON.parse(savedData)}
                updateOwnedPokemon={updateOwnedPokemon} /> 
        : null}
                <div>
                {loading && (
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

export default Owned