import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('01 - Testa o componente <PokemonDetails.js />', () => {
  const detailsLinkInnerText = { name: 'More details' };

  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      let detailsLink = screen.getByRole('link', detailsLinkInnerText);
      userEvent.click(detailsLink);

      const { name, summary } = pokemons[0];

      const detailsHeading = screen.getByRole('heading', { name: `${name} Details` });
      expect(detailsHeading).toBeInTheDocument();

      detailsLink = screen.queryByRole('link', detailsLinkInnerText);
      expect(detailsLink).not.toBeInTheDocument();

      const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
      expect(summaryHeading).toBeInTheDocument();

      const summaryParagraph = screen.getByText(summary);
      expect(summaryParagraph).toBeInTheDocument();
    });

  test('Testa se existe uma seção com os mapas contendo as localizações do pokémon.',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', detailsLinkInnerText);
      userEvent.click(detailsLink);

      const { name, foundAt } = pokemons[0];

      const locationsHeading = screen
        .getByRole('heading', { name: `Game Locations of ${name}` });
      expect(locationsHeading).toBeInTheDocument();

      const pokemonLocations = screen.getAllByAltText(`${name} location`);
      expect(pokemonLocations).toHaveLength(foundAt.length);

      foundAt.forEach(({ location, map }, index) => {
        expect(pokemonLocations[index]).toHaveAttribute('src', map);

        const locationName = screen.getByText(location);
        expect(locationName).toBeInTheDocument();
      });
    });

  test('Testa se existe uma seção com os mapas contendo as localizações do pokémon.',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', detailsLinkInnerText);
      userEvent.click(detailsLink);

      const { name } = pokemons[0];

      const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
      expect(favoriteCheck).toBeInTheDocument();

      let favoriteIcon = screen.queryByAltText(`${name} is marked as favorite`);
      expect(favoriteIcon).not.toBeInTheDocument();
      userEvent.click(favoriteCheck);

      favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
      expect(favoriteIcon).toBeInTheDocument();
      userEvent.click(favoriteCheck);

      favoriteIcon = screen.queryByAltText(`${name} is marked as favorite`);
      expect(favoriteIcon).not.toBeInTheDocument();
    });
});
