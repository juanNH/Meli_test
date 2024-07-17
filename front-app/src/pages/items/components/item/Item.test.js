import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Item } from './Item';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Item Component', () => {
  const defaultProps = {
    id: '1',
    picture: 'test-image.jpg',
    price: '100',
    title: 'Test Product',
    condition: 'new',
    free_shipping: true,
  };

  const renderItem = (props = {}) =>
    render(
      <MemoryRouter>
        <Item {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it('renders the component correctly', () => {
    renderItem();
    const price = screen.getByText(`$${defaultProps.price}`);
    const title = screen.getByText(defaultProps.title);
    const condition = screen.getByText(defaultProps.condition);
    const icon = screen.getByAltText('Free shipping');
    const image = screen.getByAltText(defaultProps.title);
    expect(image).toHaveAttribute('src', defaultProps.picture);
    expect(price).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(condition).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('does not render the shipping image when free_shipping is false', () => {
    renderItem({ free_shipping: false });

    expect(screen.queryByAltText('Free shipping')).toBeNull();
  });

  it('navigates to the correct URL when clicked', () => {
    renderItem();

    const productItem = screen.getByText(defaultProps.title).closest('.product-item');
    fireEvent.click(productItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/items/${defaultProps.id}`);
  });
});
