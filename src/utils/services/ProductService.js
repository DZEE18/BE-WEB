import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const ProductService = {}

ProductService.createProduct = async function (body) {
    return await axios.post(ApiContant.product,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

ProductService.getProducts = async function (body,params) {
    return await axios.post(ApiContant.queryProduct+params,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

ProductService.updateProduct = async function (body) {
    return await axios.put(ApiContant.product,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

ProductService.updateStatus = async function (body) {
    return await axios.put(ApiContant.productUpdateStatus,
        body,
        Service.headers())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default ProductService;