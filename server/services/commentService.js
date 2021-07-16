const Comment = require('../models/Comment');

const createComment = (body, productId, productSchemaName) => {
    return Comment.create({
        body,
        modelId: productId,
        onModel: productSchemaName
    });
}

module.exports = {
    createComment
}