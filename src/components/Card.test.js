import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'Pikachu',
    type1: 'Electric',
    type2: 'None',
    image: 'pikachu.png',
    key: 123,
    onClick: jest.fn(),
    user: {
      ownedPokemon: ['Pikachu', 'Charizard'],
    },
  };

  test('displays Pokemon name', () => {
    render(<PokemonCard {...mockPokemon} />);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  test('displays Pokemon type1', () => {
    render(<PokemonCard {...mockPokemon} />);
    const pokemonType1 = screen.getByText('Electric');
    expect(pokemonType1).toBeInTheDocument();
  });

  test('displays Pokemon type2 when type2 is provided', () => {
    render(<PokemonCard {...mockPokemon} />);
    const pokemonType2 = screen.getByText('None');
    expect(pokemonType2).toBeInTheDocument();
  });


});
