import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('01 - Testa o componente <App.js />', () => {
  test('Testa se os links de navegação são exibidos corretamente', () => {
    renderWithRouter(<App />);

    const pages = ['Home', 'About', 'Favorite Pokémons'];
    pages.forEach((page) => {
      const navLink = screen.getByRole('link', { name: page });
      expect(navLink).toBeInTheDocument();
    });
  });

  test('Testa se a aplicação é direcionada para a URL "/" ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    const pageUrl = history.location.pathname;
    expect(pageUrl).toBe('/');

    const pageHeading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(pageHeading).toBeInTheDocument();
  });

  test('Testa se a aplicação é direcionada para a URL "/about" ao clicar em "About"',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'About' }));

      const pageUrl = history.location.pathname;
      expect(pageUrl).toBe('/about');

      const pageHeading = screen
        .getByRole('heading', { level: 2, name: 'About Pokédex' });
      expect(pageHeading).toBeInTheDocument();
    });

  test('Testa se direciona para a URL "/favorites" ao clicar em "Favorite Pokémons"',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

      const pageUrl = history.location.pathname;
      expect(pageUrl).toBe('/favorites');

      const pageHeading = screen
        .getByRole('heading', { level: 2, name: 'Favorite pokémons' });
      expect(pageHeading).toBeInTheDocument();
    });

  test('Testa se direciona para a página "Not Found" ao inserir uma URL inexistente',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/url-inexistente');

      const pageUrl = history.location.pathname;
      expect(pageUrl).toBe('/url-inexistente');

      const notFoundImage = screen
        .getByAltText('Pikachu crying because the page requested was not found');
      expect(notFoundImage).toBeInTheDocument();
    });
});
