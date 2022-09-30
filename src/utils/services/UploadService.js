import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const UploadService = {}

UploadService.uploadAttachment = async function (body) {
    return await axios.post(ApiContant.upload,
        body,
        Service.headersFormData())
        .then((response) => {
            return Service.validateError(response);
        }).catch(function (error) {
            return Service.validateError(error.response);
        })
};

export default UploadService;