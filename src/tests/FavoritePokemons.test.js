import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

test('Deve ser exibido "No favorite pokemon found" se não houver pokemons favoritos',
  () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

test('Devem ser exibidos os pokémons favoritos', () => {
  const { history } = renderWithRouter(<App />);
  const favoritePokemons = [];

  for (let i = 0; i < pokemons.length; i += 2) {
    for (let j = 0; j < i; j += 1) {
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    }
    favoritePokemons.push(screen.getByTestId('pokemon-name').innerHTML);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    history.push('/');
  }
  history.push('/favorites');

  expect(screen.getAllByTestId('pokemon-name')).toHaveLength(favoritePokemons.length);
  favoritePokemons.forEach((pokemon) => {
    expect(screen.getByAltText(`${pokemon} is marked as favorite`)).toBeInTheDocument();
  });
});
