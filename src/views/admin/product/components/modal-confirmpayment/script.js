import ProductService from "./../../../../../utils/services/ProductService"

export default {
    name: "modal-confirmpayment",
    props: {
        product: Object
    },
    data() {
        return {
            isUpdating: false,
        }
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        onUpdate(){
            if(this.body.originalPrice){
                this.isUpdating = true
                let user = this.$cookies.get('user')
                let body = {
                    "_ids": [this.product._id],
                    "customerId": user._id,
                    "status": "paymentconfirm",
                }
                ProductService.updateStatus(body).then(response => {
                    this.isUpdating = false
                    if(response.status === 0){
                        this.$toast.error(response.message.description)
                    }
                    if(response.status === 1){
                        this.$toast.success("Confirm payment successfully!")
                        this.$emit('onSuccess', true)
                    }
                })
            }else{
                this.$toast.error("Price is required.")
            }
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}