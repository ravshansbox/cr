import { screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { renderWithProviders } from '../test-utils';

describe('Dashboard', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Dashboard />);
    expect(
      screen.getByRole('heading', { name: /dashboard/i }),
    ).toBeInTheDocument();
  });
});
