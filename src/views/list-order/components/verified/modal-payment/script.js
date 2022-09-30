import UploadService from "./../../../../../utils/services/UploadService"
import PaymentService from "./../../../../../utils/services/PaymentService"
import Helper from "../../../../../utils/Helper";
import ProductService from "../../../../../utils/services/ProductService";

export default {
    name: "modal-payment",
    props: {
       products: Array
    },
    data() {
        return {
            isCreating: false,
            body: {
                paymentType: "cash", //enum: cash, aba
                imageFile: "",
                imageUrl: ""
            }
        }
    },
    components: {
        UploadService,
        PaymentService
    },
    created() {

    },
    mounted() {

    },
    computed: {
        
    },
    methods: {
        onValidation(){
            if(this.body.imageFile){
                this.isCreating = true
                this.onUploadAttachment(this.body.imageFile)
            }else{
                this.$toast.error("Attactment is required.")
            }
        },

        onUploadAttachment(file){
            let formData = new FormData()
            formData.append("image", file)
            UploadService.uploadAttachment(formData)
            .then((response) => {
                if(response.imageUrl){
                    this.body.imageUrl = response.imageUrl
                    this.onUpdateToPayment()
                }else{
                    alert("Upload attachment failed.")
                }
            })
        },

        onUpdateToPayment(){
            let user = this.$cookies.get('user')
            let ids = []
            this.products.forEach((item) => ids.push(item._id))
            let body = {
                "_ids": ids,
                "customerId": user._id,
                "status": "payment",
                "paymentType": this.body.paymentType,
                "imageUrl": this.body.imageUrl
            }
            ProductService.updateStatus(body).then(response => {
                if(response.status === 0){
                    this.$toast.error(response.message.description)
                    return
                }
                this.$toast.success("Payment successfully!")
                this.$emit('onClose', 'payment')
            })
        },

        chooseImage(e) {
            let images = e.target.files;
            if(images.length > 0) {
                for(let i = 0; i < images.length; i++) {
                    var imageFile = images[i]
                    Helper.compressImage(imageFile).then(file => {
                        this.$set(this.body, 'imageFile', file);
                    })
                }
            }
        },

        fileToPath(file) { return window.URL.createObjectURL(file) },

        getTotalPrice(){
            const sum = this.products.reduce((partialSum, a) => partialSum + parseFloat(a.price), 0);
            return sum;
        },

        onClose(){
            this.$emit('onClose')
        }
    }
}