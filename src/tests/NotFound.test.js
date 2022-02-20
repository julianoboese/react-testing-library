import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('04 - Testa o componente <NotFound.js />', () => {
  test('Testa se a página de "Not Found" é renderizada corretamente', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeading = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found Crying emoji',
    });
    expect(notFoundHeading).toBeInTheDocument();

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
