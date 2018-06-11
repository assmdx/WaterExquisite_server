module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        userId:{type:String},
        number:{type:Number}
    })
    return mongoose.model('User',UserSchema)
}
