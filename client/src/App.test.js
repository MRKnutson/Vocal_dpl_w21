import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './pages/Home';
import Landing from './pages/Landing';

test('renders landing', () => {
  render(<Home />)
  const test = screen.getByText(/Log In/i);
  expect(test).toBeInTheDocument();
});
