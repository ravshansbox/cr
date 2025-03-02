import { screen } from '@testing-library/react';
import { Home } from './Home';
import { renderWithProviders } from '../test-utils';

describe('Home', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });
});
