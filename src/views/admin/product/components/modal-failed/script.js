import ProductService from "./../../../../../utils/services/ProductService"

export default {
    name: "modal-failed",
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
            this.isUpdating = true
            let user = this.$cookies.get('user')
            let body = {
                "_ids": [this.product._id],
                "customerId": user._id,
                "status": "failed"
            }
            ProductService.updateStatus(body).then(response => {
                this.isUpdating = false
                if(response.status === 0){
                    this.$toast.error(response.message.description)
                }
                if(response.status === 1){
                    this.$toast.success("Updated to failed successfully!")
                    this.$emit('onSuccess', true)
                }
            })
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}