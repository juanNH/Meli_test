import { render, screen, waitFor, act } from "@testing-library/react";
import { LazyLoad } from "./LazyLoad";

// Mocking the dynamic import component
const MockComponent = () => <div>Lazy Loaded Component</div>;
jest.mock("./../../pages/PageHome", () => MockComponent);

describe("LazyLoad component", () => {
  it("should display fallback initially", async () => {
    global.console = {
      ...console,
      error: jest.fn(),
    };
    render(LazyLoad(() => import("./../../pages/PageHome")));
    const skeleton = screen.getByTestId("lazy-skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("lazy-skeleton");
  });

    it('should load and display the lazy component', async () => {
    await act(async () => {
        render(LazyLoad(() => import('./../../pages/PageHome')));
    });
    expect(screen.getByText('Lazy Loaded Component')).toBeInTheDocument();
  }); 
});
