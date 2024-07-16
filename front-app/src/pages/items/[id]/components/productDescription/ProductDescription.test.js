import { render, screen } from '@testing-library/react';
import { ProductDescription } from './ProductDescription';

describe('ProductDescription Component', () => {
  const mockDescription = 'This is a test description of the product.';
  it('renders the description heading correctly', () => {
    render(<ProductDescription description={mockDescription} />);
    const headingElement = screen.getByRole('heading', { level: 6, name: /descripcion del producto/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the product description correctly', () => {
    render(<ProductDescription description={mockDescription} />);
    const descriptionElement = screen.getByText(mockDescription);
    expect(descriptionElement).toBeInTheDocument();
  });
});