import ProductService from "./../../../../../utils/services/ProductService"

export default {
    name: "modal-process",
    props: {
        product: Object
    },
    data() {
        return {
            isUpdating: false,
            body: {
                originalOrderNo: "",
                originalPrice: 0
            }
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
            if(this.body.originalPrice && this.body.originalOrderNo){
                this.isUpdating = true
                let user = this.$cookies.get('user')
                let body = {
                    "_ids": [this.product._id],
                    "customerId": user._id,
                    "status": "process",
                    "originalOrderNo": this.body.originalOrderNo,
                    "originalPrice": parseFloat(this.body.originalPrice)
                }
                ProductService.updateStatus(body).then(response => {
                    this.isUpdating = false
                    if(response.status === 0){
                        this.$toast.error(response.message.description)
                    }
                    if(response.status === 1){
                        this.$toast.success("Process successfully!")
                        this.$emit('onSuccess', true)
                    }
                })
            }else{
                this.$toast.error("Order No and Price are required.")
            }
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}