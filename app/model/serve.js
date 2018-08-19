module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const ObjectId = Schema.Types.ObjectId;

    const ServeSchema = new Schema({
        hotGoods:{
            type: [String]
        }
    })
    return mongoose.model('serve', ServeSchema)
}
