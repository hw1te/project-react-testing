import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);

  const noFavoriteText = screen.getByText('No favorite pokemon found');
  expect(noFavoriteText).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);

  const favoriteCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  userEvent.click(favoriteCheck);

  renderWithRouter(<FavoritePokemons />);

  const favorite = screen.getByTestId('pokemon-name');
  expect(favorite).toBeDefined();
});
