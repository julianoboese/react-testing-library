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

    const pokemonNameTest = 'pokemon-name';

    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(pokemon.name);
      expect(screen.getAllByTestId(pokemonNameTest)).toHaveLength(1);
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    });
    expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(pokemons[0].name);
  });

test('Os botões de filtro de tipo devem funcionar corretamente"', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);

  const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
  const pokemonNameTest = 'pokemon-name';

  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'All' }));

  pokemons.forEach((pokemon) => {
    expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(pokemon.name);
    userEvent.click(nextPokemonButton);
  });
  expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(pokemons[0].name);

  const pokemonTypes = [...new Set(pokemons.reduce(
    (types, { type }) => [...types, type], [],
  ))];
  const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');

  expect(pokemonTypeButtons).toHaveLength(pokemonTypes.length);

  pokemonTypeButtons.forEach((typeButton) => {
    const filteredPokemons = pokemons.filter(
      (pokemon) => pokemon.type === typeButton.innerHTML,
    );
    userEvent.click(typeButton);
    filteredPokemons.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(pokemon.name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(typeButton.innerHTML);
      userEvent.click(nextPokemonButton);
    });
    expect(screen.getByTestId(pokemonNameTest).innerHTML).toBe(filteredPokemons[0].name);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe(typeButton.innerHTML);
  });
});
