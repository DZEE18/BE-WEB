import ProductService from "./../../../../../utils/services/ProductService"

export default {
    name: "modal-tracking",
    props: {
        product: Object
    },
    data() {
        return {
            isUpdating: false,
            body: {
                trackingNo: ""
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
            if(this.body.trackingNo){
                this.isUpdating = true
                let body = {
                    "_id": this.product._id,
                    "trackingNo": this.body.trackingNo
                }
                ProductService.updateProduct(body).then(response => {
                    this.isUpdating = false
                    if(response.status === 0){
                        this.$toast.error(response.message.description)
                    }
                    if(response.status === 1){
                        this.$toast.success("Update successfully!")
                        this.$emit('onSuccess', true)
                    }
                })
            }else{
                this.$toast.error("TrackingNo is required.")
            }
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}