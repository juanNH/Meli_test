import { render } from '@testing-library/react';
import PageHome from './PageHome';

describe('PageHome Component', () => {
  it('renders without crashing and empty', () => {
    const { container } = render(<PageHome />);
    expect(container.children.length).toBe(0);
    expect(container).toBeInTheDocument();
  });
});