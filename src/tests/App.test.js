import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Os links de navegação são exibidos corretamente', () => {
  const navLinks = ['Home', 'About', 'Favorite Pokémons'];
  renderWithRouter(<App />);
  navLinks.forEach((navLink) => {
    expect(screen.getByRole('link', { name: navLink })).toBeInTheDocument();
  });
});

test('A aplicação é direcionada para a URL "/" ao clicar em "Home"', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: 'Home' }));

  expect(history.location.pathname).toBe('/');
  expect(screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' }))
    .toBeInTheDocument();
});

test('A aplicação é direcionada para a URL "/about" ao clicar em "About"', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: 'About' }));

  expect(history.location.pathname).toBe('/about');
  expect(screen.getByRole('heading', { level: 2, name: 'About Pokédex' }))
    .toBeInTheDocument();
});

test('A aplicação é direcionada para a URL "/favorites" ao clicar em "Favorite Pokémons"',
  () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    expect(history.location.pathname).toBe('/favorites');
    expect(screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' }))
      .toBeInTheDocument();
  });

test('A aplicação é direcionada para a página "Not Found" ao inserir uma URL inexistente',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-inexistente');

    expect(history.location.pathname).toBe('/url-inexistente');
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toBeInTheDocument();
  });
