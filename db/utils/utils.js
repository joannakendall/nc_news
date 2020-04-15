

exports.formatDates = list => {
    return list.map(({ created_at, ...restOfList }) => {
        const newList = {
            ...restOfList,
            created_at: new Date(created_at)
        }
        return newList
    });
};

exports.makeRefObj = (list, key, value) => {
    const refObj = {};
    list.forEach((obj) => {
        refObj[obj[key]] = obj[value];
    });
    return refObj;
};

exports.formatComments = (comments, articleRef) => {
    const renameComments = comments.map((comment) => {
        const newComment = {...comment}
        newComment['author'] = newComment['created_by']
        newComment['article_id'] = newComment['belongs_to']
        newComment.article_id = articleRef[newComment.article_id]
        newComment.created_at = new Date(newComment.created_at)
        delete newComment.created_by;
        delete newComment.belongs_to
        return newComment
    })
     return renameComments;
};


