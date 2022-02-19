import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('O card do Pokémon deve exibir os dados corretos', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: 'More details' }));

  const { name, summary, foundAt } = pokemons[0];

  expect(screen.getByRole('heading', { name: `${name} Details` })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  expect(screen.getByText(summary)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: `Game Locations of ${name}` }))
    .toBeInTheDocument();

  const pokemonLocations = screen.getAllByAltText(`${name} location`);
  expect(pokemonLocations).toHaveLength(foundAt.length);
  foundAt.forEach(({ location, map }, index) => {
    expect(pokemonLocations[index]).toHaveAttribute('src', map);
    expect(screen.getByText(location)).toBeInTheDocument();
  });

  const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
  expect(favoriteCheck).toBeInTheDocument();
  expect(screen.queryByAltText(`${name} is marked as favorite`)).not.toBeInTheDocument();
  userEvent.click(favoriteCheck);
  expect(screen.getByAltText(`${name} is marked as favorite`)).toBeInTheDocument();
  userEvent.click(favoriteCheck);
  expect(screen.queryByAltText(`${name} is marked as favorite`)).not.toBeInTheDocument();
});
