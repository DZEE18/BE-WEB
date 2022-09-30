import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const PaymentService = {}

PaymentService.createPayment = async function (body) {
    return await axios.post(ApiContant.payment,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

PaymentService.getPayments = async function (body,params) {
    return await axios.post(ApiContant.queryPayment+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default PaymentService;