// import * as sanitizeHtml from 'sanitize-html';
const sanitizeHtml = require('sanitize-html');
const { categoryMapper } = require("./categories_mapper");

/**
 * Mapper para mostrar el detalle y sanitizar el html
 * @param {Object} responseInfo 
 * @param  {Object} responseDescription 
 */
const detailItemsMapper = (responseInfo, responseDescription, responseCategories) => {
    return {
        author: {
            name: 'Jonathan Matías',
            lastname: 'Santos'
        },
        item: {
            id: responseInfo.id,
            title: responseInfo.title,
            price: {
                currency: responseInfo.currency_id,
                amount: responseInfo.price,
                decimals: null
            },
            picture: responseInfo.pictures.length ? responseInfo.pictures[0].secure_url : null,
            condition: responseInfo.condition,
            free_shipping: responseInfo.shipping.free_shipping,
            sold_quantity: responseInfo.sold_quantity,
            description: sanitizeHtml(responseDescription.plain_text)
        },
        categories: categoryMapper(responseCategories)
    }
}

exports.detailItemsMapper = detailItemsMapper;