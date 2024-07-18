import { interceptor } from "./authorSignature";
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("interceptor", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    interceptor();
  });
  const url = "https://api.example.com/data";

  it("should add interceptor header", async () => {
    await fetch(url);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: {
          "Author-Info": JSON.stringify({ name: "Juan", lastname: "Herrera" }),
          "Content-Type": "application/json",
        },
      })
    );
  });
  it("should concat interceptor header to fetch header", async () => {
    const headers = {
      "Extra-Data": "Extra data to test",
    };
    await fetch(url, { headers });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: {
          ...headers,
          "Author-Info": JSON.stringify({ name: "Juan", lastname: "Herrera" }),
          "Content-Type": "application/json",
        },
      })
    );
  });
});
