const { itemsMapper } = require ("./items_mapper.js");
const { categoryMapper } = require("./categories_mapper");

/**
 * Mapper para el resultado del response search input
 * @param {Object} response
 * @param {Object} responseCategories
 */
const searchItemsMapper = (response, responseCategories) => {
    return {
        author: {
            name: 'Jonathan Matías',
            lastname: 'Santos'
        },
        categories: categoryMapper(responseCategories),
        items: itemsMapper(response),
    }
}

exports.searchItemsMapper = searchItemsMapper;