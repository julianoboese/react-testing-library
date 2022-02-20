import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('05 - Testa o componente <Pokedex.js />', () => {
  const pokemonNameTestId = 'pokemon-name';
  const nextPokemonButtonInnerText = { name: 'Próximo pokémon' };

  test('Testa se a página tem o heading "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);

    const pokedexHeading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Testa se os próximos Pokémons são exibidos ao clicar em "Próximo pokémon"',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />);

      pokemons.forEach(({ name }) => {
        expect(screen.getAllByTestId(pokemonNameTestId)).toHaveLength(1);

        const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
        expect(pokemonNameElement).toHaveTextContent(name);

        const nextPokemon = screen.getByRole('button', nextPokemonButtonInnerText);
        userEvent.click(nextPokemon);
      });

      const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
      expect(pokemonNameElement).toHaveTextContent(pokemons[0].name);
    });

  test('Testa se os botões de filtro de tipo funcionam corretamente', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);

    const pokemonTypes = [...new Set(pokemons.reduce(
      (types, { type }) => [...types, type], [],
    ))];
    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButtons).toHaveLength(pokemonTypes.length);

    pokemonTypeButtons.forEach((typeButton) => {
      const filteredPokemons = pokemons.filter(
        ({ type }) => type === typeButton.innerHTML,
      );

      userEvent.click(typeButton);

      filteredPokemons.forEach(({ name }) => {
        const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
        expect(pokemonNameElement).toHaveTextContent(name);

        const pokemonTypeElement = screen.getByTestId('pokemon-type');
        expect(pokemonTypeElement).toHaveTextContent(typeButton.innerHTML);

        const nextPokemon = screen.getByRole('button', nextPokemonButtonInnerText);
        userEvent.click(nextPokemon);
      });

      const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
      expect(pokemonNameElement).toHaveTextContent(filteredPokemons[0].name);

      const pokemonTypeElement = screen.getByTestId('pokemon-type');
      expect(pokemonTypeElement).toHaveTextContent(typeButton.innerHTML);
    });
  });

  test('Testa se o botão "All" reseta o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);

    const allTypes = screen.getByRole('button', { name: 'All' });
    expect(allTypes).toBeInTheDocument();

    userEvent.click(allTypes);

    pokemons.forEach(({ name }) => {
      const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
      expect(pokemonNameElement).toHaveTextContent(name);

      const nextPokemon = screen.getByRole('button', nextPokemonButtonInnerText);
      userEvent.click(nextPokemon);
    });

    const pokemonNameElement = screen.getByTestId(pokemonNameTestId);
    expect(pokemonNameElement).toHaveTextContent(pokemons[0].name);
  });
});
