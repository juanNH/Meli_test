const ItemsService = require("./Items.service");
const ItemRepository = require("./../repositories/items.repository");
const Author = require("./../entities/author.entity");
const ItemsResponse = require("./../entities/itemResponse.entity");
const ItemDetailResponse = require("./../entities/itemDetailResponse.entity");
const {
  responseMockFetchItems,
  responseMockFetchItem,
  responseMockFetchItemDescription,
  searchParamsDto,
  getByIdDto,
  responseMockFetchItemsEmpty,
} = require("./../../tests/mocks");

jest.mock("./../repositories/items.repository");

describe("ItemsService", () => {
  let itemRepository;
  let itemsService;

  beforeEach(() => {
    itemRepository = new ItemRepository();
    itemsService = new ItemsService(itemRepository);
  });
  describe("getItems", () => {
    it("should return items response", async () => {
      itemRepository.getAllItems.mockResolvedValue(responseMockFetchItems);

      const result = await itemsService.getItems(searchParamsDto);

      expect(itemRepository.getAllItems).toHaveBeenCalledWith(searchParamsDto);
      expect(result).toBeInstanceOf(ItemsResponse);
      expect(result.author).toBeInstanceOf(Author);
      expect(result.items).toHaveLength(4);
      const filter = responseMockFetchItems.available_filters.find(
        (avaiableFilter) => avaiableFilter.id === "category"
      );
      expect(result.categories).toHaveLength(filter.values.length);
      expect(result.categories).toEqual([
        "Juegos y Juguetes",
        "Fútbol",
        "Animales y Mascotas",
        "Hogar, Muebles y Jardín",
        "Tenis, Pádel y Squash",
        "Fitness y Musculación",
        "Básquet",
        "Juegos de Salón",
        "Pilates y Yoga",
        "Bebés",
        "Ropa y Accesorios",
        "Voley",
        "Libros, Revistas y Comics",
        "Souvenirs, Cotillón y Fiestas",
        "Golf",
        "Ciclismo",
        "Handball",
        "Rugby",
        "Joyas y Relojes",
        "Música, Películas y Series",
        "Salud y Equipamiento Médico",
        "Softball y Beisbol",
        "Industrias y Oficinas",
        "Antigüedades y Colecciones",
        "Arte, Librería y Mercería",
        "Accesorios para Vehículos",
        "Camping, Caza y Pesca",
        "Consolas y Videojuegos",
        "Computación",
        "Fútbol Americano",
        "Alimentos y Bebidas",
        "Hockey",
        "Suplementos y Shakers",
        "Artes Marciales y Boxeo",
        "Electrónica, Audio y Video",
        "Herramientas",
        "Bádminton",
        "Celulares y Teléfonos",
        "Electrodomésticos y Aires Ac.",
        "Patín y Skateboard",
        "Agro",
        "Buceo",
        "Construcción",
        "Equitación y Polo",
        "Instrumentos Musicales",
        "Otros",
      ]);
    });

    it("should handle empty search results", async () => {
      itemRepository.getAllItems.mockResolvedValue(responseMockFetchItemsEmpty);

      const result = await itemsService.getItems(searchParamsDto);

      expect(result.items).toHaveLength(0);
      expect(result.categories).toHaveLength(0);
    });

    it("should handle errors", async () => {
      itemRepository.getAllItems.mockRejectedValue(new Error("API error"));

      await expect(itemsService.getItems(searchParamsDto)).rejects.toThrow(
        "API error"
      );
    });
  });

  describe("getItemById", () => {
    it("should return item detail response", async () => {
      itemRepository.getItemById.mockResolvedValue(responseMockFetchItem);
      itemRepository.getItemDetailById.mockResolvedValue(
        responseMockFetchItemDescription
      );

      const result = await itemsService.getItemById(getByIdDto);

      expect(itemRepository.getItemById).toHaveBeenCalledWith(getByIdDto);
      expect(itemRepository.getItemDetailById).toHaveBeenCalledWith(getByIdDto);
      expect(result).toBeInstanceOf(ItemDetailResponse);
      expect(result.author).toBeInstanceOf(Author);
      expect(result.item.id).toBe(responseMockFetchItem.id);
      expect(result.item.description).toBe(responseMockFetchItemDescription.plain_text);
    });

    it("should handle item not found", async () => {
      itemRepository.getItemById.mockResolvedValue(undefined);
      itemRepository.getItemDetailById.mockResolvedValue(undefined);

      await expect(itemsService.getItemById(getByIdDto)).rejects.toThrow(
        "Item data not found"
      );
    });

    it("should handle errors", async () => {
      itemRepository.getItemById.mockRejectedValue(new Error("API error"));
      itemRepository.getItemDetailById.mockRejectedValue(
        new Error("API error")
      );

      await expect(itemsService.getItemById(getByIdDto)).rejects.toThrow(
        "API error"
      );
    });
  });
});
