import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CatchPokemon from './CatchPopUp';
import App from '../App';

describe('CatchPokemon', () => {
  const stopLoadingMock = jest.fn();
  const closePopupMock = jest.fn();
  const updateOwnedPokemonMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays "Berhasil" message when result is greater than 50', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={60}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    const successMessage = screen.getByText('Berhasil');
    expect(successMessage).toBeInTheDocument();
  });

  test('displays "Gagal" message when result is less than or equal to 50', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={40}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    const failureMessage = screen.getByText('Gagal');
    expect(failureMessage).toBeInTheDocument();
  });

  test('calls closepopup function when the "Close" button is clicked', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={60}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(closePopupMock).toHaveBeenCalledTimes(1);
  });

  test('calls updateOwnedPokemon function with the correct arguments when result is greater than 50', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={60}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    expect(updateOwnedPokemonMock).toHaveBeenCalledWith(['Pikachu']);
  });

  test('does not call updateOwnedPokemon function when result is less than or equal to 50', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={40}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    expect(updateOwnedPokemonMock).not.toHaveBeenCalled();
  });

  test('calls stopLoading function', () => {
    render(
      <CatchPokemon
        stopLoading={stopLoadingMock}
        closepopup={closePopupMock}
        result={60}
        user={{ ownedPokemon: [] }}
        updateOwnedPokemon={updateOwnedPokemonMock}
        pokemon="Pikachu"
      />
    );

    expect(stopLoadingMock).toHaveBeenCalledTimes(1);
  });
});
