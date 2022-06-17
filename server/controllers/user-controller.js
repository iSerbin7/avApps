

class UserController {

    async registration(request, response, next){
        try {
            return response.json({
                message: "Регистрация"
            })
        } catch (e) {
            console.log(e);
        }
    }

    async login(request, response, next){
        try {
            return response.json({
                message: "Авторизация"
            })
        } catch (e) {
            console.log(e);
        }
    }

    async logout(request, response, next){
        try {
            return response.json({
                message: "Выход"
            })
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(request, response, next){
        try {
            return response.json({
                message: "Обновление токена"
            })
        } catch (e) {
            console.log(e);
        }
    }


    async getUsers(request, response, next){
        try {
            return response.json({
                message: "Получение списка Пользователей"
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();