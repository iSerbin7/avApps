const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    // Поле user тип: ObjectId
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    // Поле refreshToken тип: Строковый
    refreshToken: {type: String, required: true}
})

module.exports = model('Token', TokenSchema);