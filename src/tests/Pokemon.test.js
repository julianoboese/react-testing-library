import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

test('O card do Pokémon deve exibir os dados corretos', () => {
  renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);

  const { name, type, averageWeight, image } = pokemons[0];
  const { value, measurementUnit } = averageWeight;

  expect(screen.getByTestId('pokemon-name').innerHTML).toBe(name);
  expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
  expect(screen.getByTestId('pokemon-weight').innerHTML).toBe(
    `Average weight: ${value} ${measurementUnit}`,
  );
  expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  expect(screen.queryByAltText(`${name} is marked as favorite`)).not.toBeInTheDocument();
});

test('Caso seja um pokemon favorito, deve exibir o ícone correspondente', () => {
  renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);

  const { name } = pokemons[0];

  expect(screen.getByAltText(`${name} is marked as favorite`))
    .toHaveAttribute('src', '/star-icon.svg');
});

test('A tela de detalhes deve ser exibida corretamente ao clicar no link', () => {
  const { history } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);

  const pokemonUrl = `/pokemons/${pokemons[0].id}`;
  const detailsLink = screen.getByRole('link');
  expect(detailsLink).toHaveAttribute('href', pokemonUrl);

  userEvent.click(detailsLink);
  expect(history.location.pathname).toBe(pokemonUrl);
});
