const baseUrl = process.env.VUE_APP_BASE_URL
const v1 = '/api/v1'

const ApiContant = {
    login: baseUrl + v1 + '/user/login',
    register: baseUrl + v1 + '/user/register',
    product: baseUrl + v1 + '/item',
    queryProduct: baseUrl + v1 + '/item/query',
}

export default ApiContant;