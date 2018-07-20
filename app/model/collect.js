module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const ObjectId = Schema.Types.ObjectId;

    const CollectSchema = new Schema({
        user: {
            type:String
        },
        good: {
            type: ObjectId,
            ref: 'Good'
        },
        list_pic_url: {
            type: String
        },
        name: {
            type: String
        },
        goods_brief: {
            type: String
        },
        retail_price: {
            type: Number
        }
    })
    return mongoose.model('collects', CollectSchema)
}
