import UserService from "./../../../../../utils/services/UserService"

export default {
    name: "modal-update",
    props:{
        item: Object
    },
    data() {
        return {
            isShowPassword: false,
            isUpdating: false,
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
        
    },
    created() {
        this.bindItem()
    },
    mounted() {

    },
    methods: {
        bindItem(){
            this.body = {
                email: this.item.email,
                firstname: this.item.firstname,
                lastname: this.item.lastname,
                phone: this.item.phone,
                gender: this.item.gender,
                address: this.item.address,
                role: this.item.role
            }
        },
        onRegister() {
            let validateMsg = this.validateBody(this.body)
            if(validateMsg === "OK"){
                this.isUpdating = true
                let body = {
                    _id: this.item._id,
                    email: this.body.email,
                    password: this.body.password,
                    firstname: this.body.firstname,
                    lastname: this.body.lastname,
                    phone: this.body.phone,
                    gender: this.body.gender,
                    // address: this.body.address,
                    role: this.body.role
                }
                UserService.updateUser(body).then((response) => {
                    this.isUpdating = false
                    if(response.status === 1){
                        this.$emit("onSuccess", response.data)
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
            if (!body.firstname) { return "Firstname is required." }
            if (!body.lastname) { return "Lastname is required." }
            if (!body.phone) { return "Phone is required." }
            if (!body.gender) { return "Gender is required." }
            if (!body.address) { return "Address is required." }
            return "OK"
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}