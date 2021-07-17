const Comment = require('../models/Comment');

const createComment = (body, productId, productSchemaName) => {
    return Comment.create({
        body,
        modelId: productId,
        onModel: productSchemaName
    });
}

const getComments = (modelId, page) => {
    return Comment.find({ modelId }).sort({ createdAt: 'desc' }).skip(page * 5).limit(5);
}

const getCount = (modelId) => {
    return Comment.find({ modelId });
}

module.exports = {
    createComment,
    getComments,
    getCount
}