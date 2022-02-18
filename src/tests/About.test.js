import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

test('A página deve conter os dados sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const firstParagraphText = 'This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons';
  const secondParagraphText = 'One can filter Pokémons by type, '
  + 'and see more details for each one of them';
  const pokedexImage = screen.getByAltText('Pokédex');

  expect(screen.getByRole('heading', { level: 2, name: 'About Pokédex' }));
  expect(screen.getByText(firstParagraphText)).toBeInTheDocument();
  expect(screen.getByText(secondParagraphText)).toBeInTheDocument();
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
