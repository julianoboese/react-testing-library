import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('06 - Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />);

      const { name, type, averageWeight, image } = pokemons[0];
      const { value, measurementUnit } = averageWeight;

      const pokemonNameElement = screen.getByTestId('pokemon-name');
      expect(pokemonNameElement).toHaveTextContent(name);

      const pokemonTypeElement = screen.getByTestId('pokemon-type');
      expect(pokemonTypeElement).toHaveTextContent(type);

      const pokemonWeightElement = screen.getByTestId('pokemon-weight');
      expect(pokemonWeightElement).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

      const pokemonImage = screen.getByAltText(`${name} sprite`);
      expect(pokemonImage).toHaveAttribute('src', image);

      const favoriteIcon = screen.queryByAltText(`${name} is marked as favorite`);
      expect(favoriteIcon).not.toBeInTheDocument();
    });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const { name } = pokemons[0];

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Testa se, ao clicar no link de detalhes, é redirecionado corretamente.', () => {
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
});
