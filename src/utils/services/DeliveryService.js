import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const DeliveryService = {}

DeliveryService.createDelivery = async function (body) {
    return await axios.post(ApiContant.delivery,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

DeliveryService.getDeliveries = async function (body,params) {
    return await axios.post(ApiContant.queryDelivery+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

DeliveryService.updateDelivery = async function (body) {
    return await axios.put(ApiContant.delivery,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default DeliveryService;