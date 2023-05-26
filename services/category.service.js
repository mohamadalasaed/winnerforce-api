exports.categoryMethods = Model => {
    return {
        getByType: type => Model.find({ type: { $eq: type } }),
    }
}