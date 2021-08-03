const { QuerystringParser } = require("formidable");

module.exports = (query) => {
    const filter = {};
    if (query.priceFrom && !query.priceTo) {
        filter.currentPrice = { $gte: query.priceFrom };
    } else if (query.priceTo && !query.priceFrom) {
        filter.currentPrice = { $lte: query.priceTo };
    } else if (query.priceTo && query.priceFrom) {
        filter.currentPrice = { $gte: query.priceFrom, $lte: query.priceTo };
    }
    if (query.promotion == 'true') {
        filter.promoPrice = { $gt: 0 };
    }
    if (query.promotion == 'false') {
        filter.promoPrice = 0;
    }
    if (query.brands) {
        const brands = query.brands.split(',');
        if (brands.length > 0) {
            filter.brand = { $in: brands }
        }
    }
    return filter;
}