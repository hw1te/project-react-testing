import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa o texto dos links', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const aboutLink = screen.getByRole('link', { name: /About/i });
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('Testa redirecionamento para página na URL / ao clicar em Home', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa redirecionamento para página na URL /about ao clicar em About', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Testa redirecionamento para página na URL /favorites ao clicar em Favorite', () => {
  const { history } = renderWithRouter(<App />);

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testa se URL desconhecida redireciona para Not Found', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pagina-desconhecida');

  const notFoundText = screen.getByRole('heading', { level: 2 });
  expect(notFoundText).toBeInTheDocument();
});
