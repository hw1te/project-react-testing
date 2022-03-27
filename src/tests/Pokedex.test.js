import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const header = screen.getByRole('heading', { level: 2 });
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/encountered pokémons/i);
});

test('Testa se é exibido o próximo pokemon ao clicar no botão', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(button).toBeInTheDocument();

  pokemons.forEach((pokemon) => {
    const pokemonName = screen.getByText(`${pokemon.name}`);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(button);
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);

  const pokemon = screen.getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);

  const all = screen.getByRole('button', { name: 'All' });
  expect(all).toBeInTheDocument();

  const length = 7;
  const allButtons = screen.getAllByTestId('pokemon-type-button');
  expect(allButtons.length).toEqual(length);

  expect(screen.getByRole('button', { name: 'Electric' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Fire' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Bug' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Poison' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Psychic' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Normal' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Dragon' })).toBeVisible();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const all = screen.getByRole('button', { name: 'All' });
  expect(all).toBeVisible();
  const pokemon = screen.getByTestId('pokemon-name');
  userEvent.click(all);
  expect(pokemon).toHaveTextContent(/pikachu/i);
});
