import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Os links de navegação são exibidos corretamente', () => {
  const navLinks = ['Home', 'About', 'Favorite Pokémons'];
  renderWithRouter(<App />);
  navLinks.forEach((navLink) => {
    expect(screen.getByRole('link', { name: navLink })).toBeInTheDocument();
  });
});
