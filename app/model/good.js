module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const GoodSchema = new Schema({
        info: {
            goods_desc: {
                type: String
            },
            name: {
                type: String
            },
            goods_retail_price: {
                type: Number
            }
        },
        gallery: {
            type: [String]
        },
        attribute: {
            type: [String]
        },
        specificationList: [{
            specification_id: {
                type: String
            },
            name: {
                type: String
            },
            valueList: [{
                id: {
                    type: String
                },
                value: {
                    type: String
                }
            }]
        }],
        number: {
            type: Number
        },
    })
    return mongoose.model('Good', GoodSchema)
}
