exports.generateMethods = Model => {
    return {
        getMen: type => Model.find({ type: { $eq: type } }),
        getWomen: type => Model.find({ type: { $eq: type } }),
        getAccessories: type => Model.find({ type: { $eq: type } }),
        search: (type,toSearch) => Model.find({ $and : [  { title: {$regex: toSearch } }, { type : type } ] })
    }
} 