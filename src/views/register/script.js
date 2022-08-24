import { VueTelInput } from 'vue-tel-input'
import AuthService from './../../utils/services/AuthService'

export default {
    name: "register",
    data() {
        return {
            isShowPassword: false,
            isRegister: false,
            body: {
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                phone: "",
                gender: "male",
                address: "address",
                role:"customer"
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
        onRegister() {
            let validateMsg = this.validateBody(this.body)
            if(validateMsg === "OK"){
                this.isRegister = true
                let body = {
                    email: this.body.email,
                    password: this.body.password,
                    firstname: this.body.firstname,
                    lastname: this.body.lastname,
                    phone: this.body.phone,
                    gender: this.body.gender,
                    address: this.body.address,
                    role: this.body.role
                }
                AuthService.register(body).then((response) => {
                    this.isRegister = false
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
            if (!body.firstname) { return "Firstname is required." }
            if (!body.lastname) { return "Lastname is required." }
            if (!body.phone) { return "Phone is required." }
            if (!body.gender) { return "Gender is required." }
            if (!body.address) { return "Address is required." }
            return "OK"
        }
    }
}