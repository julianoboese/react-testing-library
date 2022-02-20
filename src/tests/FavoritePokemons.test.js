import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('03 - Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido "No favorite pokemon found" se não houver Pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const noFavoritesText = screen.getByText('No favorite pokemon found');
      expect(noFavoritesText).toBeInTheDocument();
    });

  test('Testa se são exibidos todos os Pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = [];

    for (let i = 0; i < pokemons.length; i += 2) {
      for (let j = 0; j < i; j += 1) {
        const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
        userEvent.click(nextPokemon);
      }
      const pokemonNameElement = screen.getByTestId('pokemon-name');
      favoritePokemons.push(pokemonNameElement.innerHTML);

      const detailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(detailsLink);

      const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(favoriteCheck);

      history.push('/');
    }

    history.push('/favorites');

    const allFavorites = screen.getAllByTestId('pokemon-name');
    expect(allFavorites).toHaveLength(favoritePokemons.length);

    favoritePokemons.forEach((pokemon) => {
      const favoriteIcon = screen.getByAltText(`${pokemon} is marked as favorite`);
      expect(favoriteIcon).toBeInTheDocument();
    });
  });
});
