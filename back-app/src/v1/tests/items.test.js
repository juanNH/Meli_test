const request = require("supertest");
const app = require("./../../../app");
const {
  responseMockFetchItems,
  responseMockFetchItem,
  responseMockFetchItemDescription,
  getByIdDto,
  searchParamsDto,
} = require("./mocks");
jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");
describe("Items API End-to-End Tests", () => {
  afterEach(() => {
    fetch.mockClear();
  });
  it("should fetch a list of items based on search parameters", async () => {
    // Mock different responses based on URL
    fetch.mockImplementation((url) => {
      if (url.includes("/sites/MLA/search")) {
        return Promise.resolve(
          new Response(JSON.stringify(responseMockFetchItems), { status: 200 })
        );
      }
      return Promise.reject(new Error("Not Found"));
    });
    const response = await request(app)
      .get("/api/v1/items")
      .query({ q: searchParamsDto.q })
      .set(
        "Author-Info",
        JSON.stringify(searchParamsDto.author)
      );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("items");
    expect(response.body).toHaveProperty("author");
    expect(response.body.author).toStrictEqual(searchParamsDto.author);
    expect(response.body.items.length).toBeGreaterThan(0);
  });

  it("should fetch item details by ID", async () => {
    fetch.mockImplementation((url) => {
      if (url.includes(`/items/${getByIdDto.idItem}`)) {
        if (url.endsWith("/description")) {
          return Promise.resolve(
            new Response(JSON.stringify(responseMockFetchItemDescription), { status: 200 })
          );
        } else {
          return Promise.resolve(
            new Response(JSON.stringify(responseMockFetchItem), {
              status: 200,
            })
          );
        }
      }
      return Promise.reject(new Error("Not Found"));
    });
    const response = await request(app)
      .get(`/api/v1/items/${getByIdDto.idItem}`)
      .set(
        "Author-Info",
        JSON.stringify(getByIdDto.author)
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("item");
    expect(response.body).toHaveProperty("author");
    expect(response.body.author).toStrictEqual(getByIdDto.author);
    expect(response.body.item.id).toBe(getByIdDto.idItem);
  });

  /*   it("should return 404 if item not found", async () => {
    const invalidItemId = "invalidItemId";
    const response = await request(app)
      .get(`/api/v1/items/${invalidItemId}`)
      .set(
        "Author-Info",
        JSON.stringify({ name: "Juan", lastname: "Herrera" })
      );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Item data not found");
  });  */
});
