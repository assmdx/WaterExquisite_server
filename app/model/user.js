module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        userId:{type:String},
        number:{type:Number},
        address:{type:String}
    })
    return mongoose.model('User',UserSchema)
}
