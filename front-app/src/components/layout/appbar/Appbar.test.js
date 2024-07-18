import { render, fireEvent, screen } from '@testing-library/react';
import { Appbar } from './Appbar';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Appbar component', () => {
  beforeEach(() => {
    // Clear any previous mock calls
    jest.clearAllMocks();
  });

  it('should render Appbar correctly', () => {
    render(
      <MemoryRouter>
        <Appbar />
      </MemoryRouter>
    );

    // Check if the logo is rendered
    expect(screen.getByAltText('Logo Meli')).toBeInTheDocument();

    // Check if the search input and button are rendered
    expect(screen.getByPlaceholderText('Buscar productos, marcas y más...')).toBeInTheDocument();
    expect(screen.getByAltText('Buscar')).toBeInTheDocument();
  });

  it('should update search input value correctly', () => {
    render(
      <MemoryRouter>
        <Appbar />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...');

    // Simulate user typing into the search input
    fireEvent.change(searchInput, { target: { value: 'example search' } });

    // Check if the input value is updated
    expect(searchInput.value).toBe('example search');
  });

  it('should navigate to search page on form submission', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <Appbar />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    const searchButton = screen.getByAltText('Buscar');

    // Simulate user typing into the search input
    const valueSearch = 'pelota roja';
    const finalSearch = valueSearch.replace(" ","%20");
    fireEvent.change(searchInput, { target: { value: finalSearch } });

    // Simulate form submission
    fireEvent.submit(searchButton);

    // Check if useNavigate is called with the correct URL
    expect(searchButton).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith(`/items?search=${finalSearch}`);
  });
});
