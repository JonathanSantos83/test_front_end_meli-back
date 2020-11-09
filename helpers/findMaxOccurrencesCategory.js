/**
 * Helper para obtener las ocurrencias máximas de categoría en los resultados
 */

const findMaxOccurrencesCategory = (results) => {
    let catMap = {};
    results.forEach(result => {
      if (catMap[result.category_id] !== undefined) {
        catMap[result.category_id] = catMap[result.category_id] + 1;
      } else {
        catMap[result.category_id] = 0;
      }
    });
    return Object.keys(catMap).reduce((a, b) => catMap[a] > catMap[b] ? a : b);
  }

  exports.findMaxOccurrencesCategory = findMaxOccurrencesCategory;