import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('A página de "Not Found" deve ser renderizada corretamente', () => {
  renderWithRouter(<NotFound />);

  const notFoundImage = screen
    .getByAltText('Pikachu crying because the page requested was not found');

  expect(screen.getByRole('heading', {
    level: 2, name: 'Page requested not found Crying emoji',
  }));
  expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
