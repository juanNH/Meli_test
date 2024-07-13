class ItemsResponse {
  constructor({ author, categories, items }) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}

module.exports = ItemsResponse;
