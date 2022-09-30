import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const UserService = {}

UserService.createUser = async function (body) {
    return await axios.post(ApiContant.user,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

UserService.getUsers = async function (body,params) {
    return await axios.post(ApiContant.queryUser+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

UserService.updateUser = async function (body) {
    return await axios.put(ApiContant.user,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default UserService;