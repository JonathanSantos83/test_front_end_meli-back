const axios = require("axios");
const { searchItemsMapper } = require("../mappers/search_mapper");
const { detailItemsMapper } = require("../mappers/detail_mapper");
const { findMaxOccurrencesCategory } = require("../helpers/findMaxOccurrencesCategory");

class ItemService {
  /**
   * buscar la info de los items
   * @param {string} query
   */
  static async search(query) {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    );
    const getCategories = await this.categories(findMaxOccurrencesCategory(data.results));
    return searchItemsMapper(data, getCategories.data);
  }

  /**
   * buscar el detalle de un item
   * @param {string} id
   */
  static async detail(id) {
    const [itemInfo, itemDescription] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ]);
    const getCategories = await this.categories(itemInfo.data.category_id);
    return detailItemsMapper(
      itemInfo.data,
      itemDescription.data,
      getCategories.data
    );
  }

  /**
   * buscar las categorías por id
   * @param {string} idCategory
   */
  static async categories(idCategory) {
    return axios.get(`https://api.mercadolibre.com/categories/${idCategory}`);
  }
}

module.exports = ItemService;
