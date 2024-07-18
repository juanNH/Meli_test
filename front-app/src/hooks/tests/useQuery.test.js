import { useQuery } from "./../useQuery";
import { MemoryRouter, useLocation } from "react-router-dom";
import { renderHook } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("useQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty params when no search parameters are present", () => {
    useLocation.mockReturnValue({
      search: "",
    });

    const { result } = renderHook(() => useQuery(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.get("key")).toBeNull();
    expect(result.current.get("anotherKey")).toBeNull();
  });

  it("should parse search parameters correctly", () => {
    useLocation.mockReturnValue({
      search: "?key=value&anotherKey=anotherValue",
    });

    const { result } = renderHook(() => useQuery(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.get("key")).toBe("value");
    expect(result.current.get("anotherKey")).toBe("anotherValue");
  });
});
