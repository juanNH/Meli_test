import { render, screen } from '@testing-library/react';
import { ProductImage } from './ProductImage';

describe('ProductImage Component', () => {
  const mockPicture = 'https://via.placeholder.com/150';
  const mockAlt = 'Placeholder image';

  it('renders the product image correctly', () => {
    render(<ProductImage picture={mockPicture} alt={mockAlt} />);
    const imageElement = screen.getByRole('img', { name: mockAlt });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockPicture);
  });

  it('has the correct alt text', () => {
    render(<ProductImage picture={mockPicture} alt={mockAlt} />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement).toBeInTheDocument();
  });
});