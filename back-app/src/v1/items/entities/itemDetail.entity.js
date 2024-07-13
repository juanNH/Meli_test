const Item = require("./item.entity");

class ItemsDetail extends Item {
  constructor({
    id,
    title,
    price,
    picture,
    condition,
    free_shipping,
    sold_quantity,
    description,
  }) {
    super({
      id,
      title,
      price,
      picture,
      condition,
      free_shipping,
    });
    this.sold_quantity = sold_quantity;
    this.description = description;
  }
}

module.exports = ItemsDetail;
