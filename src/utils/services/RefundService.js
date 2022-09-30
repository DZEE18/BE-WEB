import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const RefundService = {}

RefundService.createRefund = async function (body) {
    return await axios.post(ApiContant.refund,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

RefundService.getRefunds = async function (body,params) {
    return await axios.post(ApiContant.queryRefund+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

RefundService.updateRefund = async function (body) {
    return await axios.put(ApiContant.refund,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default RefundService;