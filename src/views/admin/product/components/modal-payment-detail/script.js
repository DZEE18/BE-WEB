import PaymentService from "../../../../../utils/services/PaymentService"

export default {
    name: "modal-payment-detail",
    props: {
        productId: String
    },
    data() {
        return {
            isLoading: true,
            product: ""
        }
    },
    components: {

    },
    created() {
        this.getPaymentDetail()
    },
    mounted() {

    },
    methods: {
        getPaymentDetail(){
            this.isLoading = true
            PaymentService.getPaymentByItemId(this.productId).then(response => {
                this.isLoading = false
                if(response.status === 0){
                    this.product = ""
                    return
                }
                this.product = response.data
            })
        },
        onClose(){
            this.$emit('onClose')
        }
    }
}