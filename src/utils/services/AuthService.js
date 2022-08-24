import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const AuthService = {}

AuthService.login = async function (body) {
    return await axios.post(ApiContant.login,
        body,
        Service.headerWithoutToken())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

AuthService.register = async function (body) {
    return await axios.post(ApiContant.register,
        body,
        Service.headerWithoutToken())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default AuthService;