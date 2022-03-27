import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('Teste se renderiza um card com as informações do pokémon.', () => {
  renderWithRouter(<App />);

  const { averageWeight: { value, measurementUnit }, image, name } = pokemons[0];
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(/pikachu/i);

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/electric/i);

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

  const pokemonImage = screen.getByRole('img');
  expect(pokemonImage).toHaveAttribute('src', image);
  expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
});

test('Teste se clicando no link More details, o redirecionamento ocorre.', () => {
  const { history } = renderWithRouter(<App />);

  const { id } = pokemons[0];

  const details = screen.getByRole('link', { name: /More details/i });
  expect(details).toBeInTheDocument();
  userEvent.click(details);

  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

  const images = screen.getAllByRole('img');
  expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(images[1]).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
});
