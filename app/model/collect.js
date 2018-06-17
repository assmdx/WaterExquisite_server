module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const CollectSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        good: {
            type: {Schema.Types.ObjectId, ref: 'Good'}
        },
        list_pic_url:{type:String},
        name:{type:String},
        goods_brief:{type:String},
        retail_price:{type:Number}
    })
    return mongoose.model('Collect',CollectSchema)
}
