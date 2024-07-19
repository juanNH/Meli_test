const ItemRepository = require("./items.repository");

describe("ItemRepository", () => {
  const apiBaseUrl = "https://api.example.com";
  const itemRepository = new ItemRepository(apiBaseUrl);

  afterEach(() => {
    fetch.mockClear();
  });

  describe("getAllItems", () => {
    it("should fetch all items based on search parameters", async () => {
      const mockData = { results: ["item1", "item2"] };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const searchParams = { q: "query" };
      const result = await itemRepository.getAllItems(searchParams);

      expect(fetch).toHaveBeenCalledWith(
        `${apiBaseUrl}/sites/MLA/search?q=query`
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors during fetch", async () => {
      fetch.mockRejectedValue(new Error("Network error"));

      const searchParams = { q: "query" };

      await expect(itemRepository.getAllItems(searchParams)).rejects.toThrow(
        "Error to get items from API: Network error"
      );
    });

    it("should handle errors during JSON parsing", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.reject(new Error("Unexpected token I in JSON at position 0")),
      });

      const searchParams = { q: "query" };

      await expect(itemRepository.getAllItems(searchParams)).rejects.toThrow(
        "Error to parse data to json: Unexpected token I in JSON at position 0"
      );
    });
  });

  describe("getItemById", () => {
    it("should fetch item by ID", async () => {
      const mockData = { id: "123", name: "Item Name" };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const getByIdDto = { idItem: "123" };
      const result = await itemRepository.getItemById(getByIdDto);

      expect(fetch).toHaveBeenCalledWith(`${apiBaseUrl}/items/123`);
      expect(result).toEqual(mockData);
    });

    it("should handle errors during fetch", async () => {
      fetch.mockRejectedValue(new Error("Network error"));

      const getByIdDto = { idItem: "123" };

      await expect(itemRepository.getItemById(getByIdDto)).rejects.toThrow(
        "Error to get items from API: Network error"
      );
    });

    it("should handle errors during JSON parsing", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.reject(new Error("Unexpected token I in JSON at position 0")),
      });

      const getByIdDto = { idItem: "123" };

      await expect(itemRepository.getItemById(getByIdDto)).rejects.toThrow(
        "Error to parse data to json: Unexpected token I in JSON at position 0"
      );
    });
  });

  describe("getItemDetailById", () => {
    it("should fetch item detail by ID", async () => {
      const mockData = { text: "Item description" };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const getByIdDto = { idItem: "123" };
      const result = await itemRepository.getItemDetailById(getByIdDto);

      expect(fetch).toHaveBeenCalledWith(`${apiBaseUrl}/items/123/description`);
      expect(result).toEqual(mockData);
    });

    it("should handle errors during fetch", async () => {
      fetch.mockRejectedValue(new Error("Network error"));

      const getByIdDto = { idItem: "123" };

      await expect(
        itemRepository.getItemDetailById(getByIdDto)
      ).rejects.toThrow("Error to get items from API: Network error");
    });

    it("should handle errors during JSON parsing", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.reject(new Error("Unexpected token I in JSON at position 0")),
      });

      const getByIdDto = { idItem: "123" };

      await expect(
        itemRepository.getItemDetailById(getByIdDto)
      ).rejects.toThrow(
        "Error to parse data to json: Unexpected token I in JSON at position 0"
      );
    });
  });
});
