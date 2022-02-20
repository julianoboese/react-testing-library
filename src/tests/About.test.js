import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('02 - Testa o componente <About.js />', () => {
  test('Testa se a página contém os dados sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexHeading = screen
      .getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pokedexHeading).toBeInTheDocument();

    const firstParagraphText = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraphText).toBeInTheDocument();

    const secondParagraphText = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraphText).toBeInTheDocument();

    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
