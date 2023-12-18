import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PopUp from '../components/PopUp';
import { getPokemon } from '../services/pokemonSvc';
import Pagination from '../components/pagination';
import { Navbar } from '../components/Navbar';
import { ReactComponent as Pokeball } from '../img/pokeball.svg'

const API_URL = 'https://pokeapi.co/api/v2'

const Pokemons = () => {
  const savedData = localStorage.getItem("user-save-data");

  const [listPokemon, setListPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [loading, setLoading]=useState(true);
  const [currentlUrl, setCurrentUrl] = useState(`${API_URL}/pokemon?limit=12`);
  const [nextUrl,setNextUrl]=useState();
  const [prevUrl,setPrevUrl]=useState();
  const [open, setOpen] = useState(false);
  
  const intiialLoad = async () => {
    setLoading(true)
    const response = await fetch(`${currentlUrl}`)
    const data = await response.json();
    setNextUrl(data.next);
    setPrevUrl(data.previous)
    loadPokemon(data)
    console.log(data);
    setLoading(false)
  }

  const loadPokemon = async (data) => {
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const data = await getPokemon(pokemon.name);
        return data;
      })
    );
    setListPokemon(pokemonDetails);
  };
  

  const updateOwnedPokemon = (newOwnedPokemon) => {
    const userData = JSON.parse(savedData);
    userData.ownedPokemon = newOwnedPokemon;
    localStorage.setItem('user-save-data', JSON.stringify(userData));
  };

  function nextPage() {
    setListPokemon([])
    setCurrentUrl(nextUrl)
    setCurrentPage(currentPage + 1)
  }

  function prevPage() {
    setListPokemon([])
    setCurrentUrl(prevUrl)
    setCurrentPage(currentPage - 1)
  }

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  };

  useEffect(() => {
    intiialLoad();
  },[currentlUrl]);

  useEffect(() => {
    if (!savedData) {
      localStorage.setItem("user-save-data", JSON.stringify(
        {
          id: "1",
          username: "JohnDoe",
          email: "johndoe@example.com",
          ownedPokemon: ["bulbasaur", "ivysaur", "squirtle"]
        }
      ));
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [subsPerPage] = useState(12);
  
  const paginate = (pageNumber) => {
    setListPokemon([])
    setCurrentUrl(`${API_URL}/pokemon?limit=12&offset=${(pageNumber-1)*12}`);
    setCurrentPage(pageNumber);
  }
  
  return (
    <div className=''>
      <Navbar />
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

    <Pagination
          postsPerPage={subsPerPage}
          totalPosts={1281}
          paginate={paginate}
          currentPage={currentPage}
          previous={prevPage}
          next={nextPage}
        />

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

export default Pokemons