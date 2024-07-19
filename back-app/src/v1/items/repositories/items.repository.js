class ItemRepository {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async getAllItems(searchParams) {
    const url =
      this.apiBaseUrl +
      "/sites/MLA/search?" +
      new URLSearchParams({ q: searchParams.q });
    return fetch(url)
      .then((response) => {
        if (response.json) {
          return response
            .json()
            .then((jsonResponse) => {
              return jsonResponse;
            })
            .catch((error) => {
              throw new Error(`Error to parse data to json: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        throw new Error(`Error to get items from API: ${error.message}`);
      });
  }

  async getItemById(getByIdDto) {
    const urlItem = this.apiBaseUrl + `/items/${getByIdDto.idItem}`;
    return fetch(urlItem, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((jsonResponse) => {
              return jsonResponse;
            })
            .catch((error) => {
              throw new Error(`Error to parse data to json: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        throw new Error(`Error to get items from API: ${error.message}`);
      });
  }
  async getItemDetailById(getByIdDto) {
    const urlDetail =
      this.apiBaseUrl + `/items/${getByIdDto.idItem}/description`;
    return fetch(urlDetail, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((jsonResponse) => {
              return jsonResponse;
            })
            .catch((error) => {
              throw new Error(`Error to parse data to json: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        throw new Error(`Error to get items from API: ${error.message}`);
      });
  }
}

module.exports = ItemRepository;
