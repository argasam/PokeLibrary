const API_URL = 'https://pokeapi.co/api/v2'

export const getPokemons = async (offset, limit) => {
  try {
    const response = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getPokemon = async (name) => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}