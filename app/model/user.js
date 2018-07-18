module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        userId:{type:String},
        phoneNum:{type:String},
        address:{type:String},

        openid:{type:String},
        last_login_time:{type:Date},
        last_login_ip: {type:String},

        avatarUrl:{type:String},
        nickName:{type:String},
        gender:{type:String},
    })
    return mongoose.model('users',UserSchema)
}
