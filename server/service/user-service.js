const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');
const { response } = require('express');

class UserService {
    async registration(email, password) {
        // Проверяем нет ли пользователя с таким email
        const candidate = await UserModel.findOne({ email });
        // Если есть - возвращаем ошибку
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        // Хешируем пароль
        const hashPassword = await bcrypt.hash(password, 3);
        // Генерируем ссылку активации
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        // Отправляем ссылку активации на почту пользователя
        await mailService.sendActiovationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        // Генерируем токены
        const tokens = tokenService.generateToken({ ...userDto });
        // Сохраняем refresh токен в базу данных
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        // Возвращаем информацию о пользователя и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с таким ${email} не найден`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Некорректный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        // Сохраняем refresh токен в базу данных
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        // Возвращаем информацию о пользователя и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDataBase = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDataBase){
            throw ApiError.UnauthorizedError();
        }
        const user = UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        // Сохраняем refresh токен в базу данных
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        // Возвращаем информацию о пользователя и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();