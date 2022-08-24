import VueCookies from 'vue-cookies'
// import Vue from 'vue'

const MainService = {}

MainService.headers = function() {
    let user = VueCookies.get("user");
    // let user = Vue.prototype.$session.get('user')
    if(user) {
        let header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        }
        return header;
    } //else { MainService.logout() }
};

MainService.headersFormData = function() {
    let user = VueCookies.get("user");
    // let user = Vue.prototype.$session.get('user')
    if(user) {
        let header = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + user.token
            }
        }
        return header;
    }
};

MainService.headerWithoutToken = function() {
    let header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return header;
}

MainService.validateError = function(data) {
    if(data && data.status === 500) {
        let error = {
            response:{ 
                data : data 
            },
            message: {
                description: data.data.error
            }
        }
        return error
    }
    if(data && data.status === 401) {
        MainService.logout();
    }
    return data.data;
};

MainService.logout = function() {
    VueCookies.remove("user")
    // Vue.prototype.$session.destroy()
    location.reload();
};

export default MainService;