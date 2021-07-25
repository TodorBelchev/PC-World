const notebookService = require('../services/notebookService');

const services = {
    'notebooks': notebookService
}

const getProductsWithLatestPrice = async (products) => {
    const mapped = [];
    return products.forEach(async (x) => {
        await services[x.type].getById(x._id)
            .then(y => {
                mapped.push({
                    _id: y._id,
                    type: x.type,
                    purchaseQuantity: x.quantity,
                    purchasePrice: y.promoPrice !== 0 ? y.promoPrice : y.price
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
}


module.exports = {
    getProductsWithLatestPrice
}