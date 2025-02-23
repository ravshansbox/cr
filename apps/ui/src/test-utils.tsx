import { JSX } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export const renderWithProviders = (element: JSX.Element) => {
  render(<MemoryRouter>{element}</MemoryRouter>);
};
