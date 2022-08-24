import { VueTelInput } from 'vue-tel-input'
import AuthService from './../../utils/services/AuthService'

export default {
    name: "login",
    data() {
        return {
            isShowPassword: false,
            isLogin: false,
            body: {
                email: "",
                password: ""
            }
        }
    },
    components: {
        VueTelInput
    },
    created() {

    },
    mounted() {

    },
    methods: {
        onLogin() {
            let validateMsg = this.validateBody(this.body)
            if(validateMsg === "OK"){
                this.isLogin = true
                let body = {
                    "email": this.body.email,
                    "password": this.body.password
                }
                AuthService.login(body).then((response) => {
                    this.isLogin = false
                    if(response.status === 1){
                        this.$cookies.set("user", response.data);
                        location.reload();
                    }else{
                        this.$toast.error(response.message.description);
                    }
                })
            }else{
                this.$toast.error(validateMsg);
            }
        },
        validateBody(body) {
            if (!body.email) { return "Email is required." }
            if (!body.password) { return "Password is required." }
            return "OK"
        }
    }
}