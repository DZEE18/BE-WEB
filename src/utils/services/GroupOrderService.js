import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const GroupOrderService = {}

GroupOrderService.createGroupOrder = async function (body) {
    return await axios.post(ApiContant.groupOrder,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

GroupOrderService.getGroupOrders = async function (body,params) {
    return await axios.post(ApiContant.queryGroupOrder+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

GroupOrderService.updateStatus = async function (body) {
    return await axios.put(ApiContant.groupOrder,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default GroupOrderService;