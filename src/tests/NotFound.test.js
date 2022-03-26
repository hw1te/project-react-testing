import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Teste se contém um heading h2 com o texto Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);

  const notFoundMessage = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(notFoundMessage).toBeInTheDocument();
});

test('Teste se a página mostra a imagem com a src correta', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByAltText(/Pikachu crying because the/i);
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
