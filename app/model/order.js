module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const OrderSchema = new Schema({
        user:{type:Schema.Types.ObjectId , ref:'User'},
        orderh_sn:{type:String},
        order_status_text:{type:String},
        actual_price:{type:Number},
        good_:{
            id:{type:String},
            list_pic_url:{type:String},
            name:{type:String},
            number:{type:Number}
        },
        handleOption:{
            pay:{type:Boolean},
        }
    })
    return mongoose.model('Order',OrderSchema)
}
