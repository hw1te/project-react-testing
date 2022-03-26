import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  renderWithRouter(<About />);

  const header = screen.getByRole('heading', { name: 'About Pokédex' }, { level: 2 });
  expect(header).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />);

  const paragraph1 = screen.getByText('This application simulates a Pokédex'
  + ', a digital encyclopedia containing all Pokémons');
  const paragraph2 = screen.getByText('One can filter Pokémons by type,'
  + ' and see more details for each one of them');

  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('Teste se a página contém a imagem de uma Pokédex com o link correto', () => {
  renderWithRouter(<About />);

  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
