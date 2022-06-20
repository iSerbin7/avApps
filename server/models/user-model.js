const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    // Поле email тип: Строковый, поле уникальное, поле обязательное
    email: {type: String, unique: true, required: true},
    // Поле password тип: Строковый, поле обязательное
    password: {type: String, required: true},
    // Поле isActivated тип: Логический
    isActivated: {type: Boolean, default: false},
    // Поле email тип: Строковый
    activationLink: {type: String}
})

module.exports = model('User', UserSchema);