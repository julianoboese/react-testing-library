import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

test('A página deve ter o heading "Encountered pokémons"', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);

  expect(screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' }))
    .toBeInTheDocument();
});

test('Os próximos pokemons da lista devem ser mostrados ao clicar em "Próximo pokémon"',
  () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);

    for (let i = 0; i < pokemons.length; i += 1) {
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(pokemons[i].name);
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    }
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
  });

test('Os botões de filtro de tipo devem funcionar corretamente"', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);

  const pokemonTypes = [...new Set(pokemons.reduce(
    (types, { type }) => [...types, type], [],
  ))];

  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'All' }));
  for (let i = 0; i < pokemons.length; i += 1) {
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe(pokemons[i].name);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
  }

  pokemonTypes.forEach((type) => {
    expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
  });
  pokemonTypes.forEach((type) => {
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.type === type);
    userEvent.click(screen.getByRole('button', { name: type }));
    for (let i = 0; i < filteredPokemons.length; i += 1) {
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(filteredPokemons[i].name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    }
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe(filteredPokemons[0].name);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
  });
});
