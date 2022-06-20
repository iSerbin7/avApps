const ApiError = require('../exeptions/api-error');

module.exports = function (err, request, response, next){
    console.log(err);
    if (err instanceof ApiError){
        return response.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    }
    return response.status(500).json({
        message: 'Непредвиденная ошибка'
    })
}