const Item = require("./../entities/item.entity");
const Author = require("./../entities/author.entity");
const ItemsResponse = require("./../entities/itemResponse.entity");
const ItemsDetail = require("./../entities/itemDetail.entity");
const ItemDetailResponse = require("./../entities/itemDetailResponse.entity");
const Price = require("./../entities/price.entity");
const getNumberAndDecimal = require("./../../../commons/helpers/getDecimal");
const { HttpError } = require('./../../../middleware/errorHandler');
class ItemsService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }
  async getItems(searchParamsDto) {
    const responseItems = await this.itemRepository.getAllItems(
      searchParamsDto
    );
    responseItems.results = responseItems.results.slice(0, 4);
    const author = new Author({
      name: searchParamsDto.author.name,
      lastname: searchParamsDto.author.lastname,
    });
    const categories = [];
    const items = [];
    const filter = responseItems.available_filters.find(
      (avaiableFilter) => avaiableFilter.id === "category"
    );
    if (filter) {
      filter.values
        .sort((a, b) => b.results - a.results)
        .forEach((c) => {
          categories.push(c.name);
        });
    }
    for (const result of responseItems.results) {
      const condition = result.attributes.find(
        (at) => at.id === "ITEM_CONDITION"
      );
      const { number: amount, decimal } = getNumberAndDecimal(result.price);
      const item = new Item({
        id: result.id,
        title: result.title,
        price: new Price({
          currency: result.currency_id,
          amount: amount,
          decimals: decimal,
        }),
        picture: result.thumbnail,
        condition: condition ? condition.value_name : null,
        free_shipping: result.shipping.free_shipping,
      });
      items.push(item);
    }
    const itemsResponse = new ItemsResponse({ author, items, categories });
    return itemsResponse;
  }
  async getItemById(getByIdDto) {
    const detailPromise = this.itemRepository.getItemDetailById(getByIdDto);
    const itemPromise = this.itemRepository.getItemById(getByIdDto);
    const [itemData, detailData] = await Promise.all([
      itemPromise,
      detailPromise,
    ]);
    if(itemData === undefined || detailData === undefined){
      throw new HttpError(404, 'Item data not found');
    }
    const { number: amount, decimal } = getNumberAndDecimal(itemData.price);
    const condition = itemData.attributes.find(
      (at) => at.id === "ITEM_CONDITION"
    );
    const itemDetail = new ItemsDetail({
      id: itemData.id,
      title: itemData.title,
      price: new Price({
        currency: itemData.currency_id,
        amount: amount,
        decimals: decimal,
      }),
      picture: itemData.pictures[0].url,
      condition: condition ? condition.value_name : null,
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.initial_quantity,
      description: detailData.plain_text,
    });
    const author = new Author({
      name: getByIdDto.author.name,
      lastname: getByIdDto.author.lastname,
    });
    const item = new ItemDetailResponse({ item: itemDetail, author });
    return item;
  }
}
module.exports = ItemsService;
