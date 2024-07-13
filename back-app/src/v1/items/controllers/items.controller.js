const ItemsService = require("./../services/Items.service");
const ItemRepository = require("../repositories/items.repository");
const GetByIdDto = require("./../dto/getById.dto");
const SearchParamDto = require("./../dto/searchParam.dto");
const itemRepository = new ItemRepository("https://api.mercadolibre.com");
const itemsService = new ItemsService(itemRepository);

const getItems = async (req, res, next) => {
  try {
    const items = await itemsService.getItems(new SearchParamDto(req.query.q));
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await itemsService.getItemById(new GetByIdDto(itemId));
    res.json(item);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getItemById,
  getItems,
};
