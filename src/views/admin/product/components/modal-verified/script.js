import ProductService from "./../../../../../utils/services/ProductService"

export default {
    name: "modal-verifed",
    props: {
        product: Object
    },
    data() {
        return {
            isUpdating: false,
            body: {
                price: 0
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
            if(this.body.price){
                this.isUpdating = true
                let user = this.$cookies.get('user')
                let body = {
                    "_ids": [this.product._id],
                    "customerId": user._id,
                    "status": "verified",
                    "price": this.body.price,
                }
                ProductService.updateStatus(body).then(response => {
                    this.isUpdating = false
                    if(response.status === 0){
                        this.$toast.error(response.message.description)
                    }
                    if(response.status === 1){
                        this.$toast.success("Verified successfully!")
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