exports.generateMethods = Model => {
    return {
        getMen: type => Model.find({ type: { $eq: type } }),
        getWomen: type => Model.find({ type: { $eq: type } }),
        getAccessories: type => Model.find({ type: { $eq: type } }),
        search: (type,toSearch) => Model.find({ $and : [  { title: {$regex: toSearch } }, { type : type } ] }),
        getRandomProducts: type => Model.aggregate([{ $match: { type: type } },{ $sample: { size: 4 } }]),
        getProductBySlug: slug => Model.findOne({ slug: slug }),
        getByCategory: (type,category) => Model.find({ $and : [  { category : category }, { type : type } ] }),
        getByCategoryAndSearch: (type,category,toSearch) => Model.find({ $and : [  { category : category }, { type : type }, { title: {$regex: toSearch } } ] }),
    }
} 