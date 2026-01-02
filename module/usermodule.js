const mongoose= require("mongoose")

const UserSchema= mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: String,
    email_id: { type: String, required: true, unique: true },
    gender: String,
})

const mymodel = mongoose.model("User", UserSchema)

module.exports = mymodel