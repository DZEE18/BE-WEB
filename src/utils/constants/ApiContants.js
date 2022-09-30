const baseUrl = process.env.VUE_APP_BASE_URL
const v1 = '/api/v1'

const ApiContant = {
    login: baseUrl + v1 + '/user/login',
    register: baseUrl + v1 + '/user/register',
    user: baseUrl + v1 + '/user',
    queryUser: baseUrl + v1 + '/user/query',
    product: baseUrl + v1 + '/item',
    productUpdateStatus: baseUrl + v1 + '/item/status',
    queryProduct: baseUrl + v1 + '/item/query',
    groupOrder: baseUrl + v1 + '/grouporder',
    queryGroupOrder: baseUrl + v1 + '/grouporder/query',
    payment: baseUrl + v1 + '/payment',
    queryPayment: baseUrl + v1 + '/payment/query',
    upload : baseUrl + v1 + '/service/upload',

    refund: baseUrl + v1 + '/refund',
    queryRefund: baseUrl + v1 + '/refund/query',
}

export default ApiContant;