import { VueTelInput } from 'vue-tel-input'
import MainService from '../../utils/services/MainService'
import ProductService from './../../utils/services/ProductService'

export default {
    name: "create-order",
    data() {
        return {
            isCreating: false,
            user: "",
            body: {
                name: "",
                description: "",
                size: "",
                color: "",
                qty: 0,
                price: 0.00,
                url: "",
                images: []
            }
        }
    },
    components: {
        VueTelInput
    },
    created() {
        this.getUser()
    },
    mounted() {

    },
    methods: {
        getUser(){
            let user = this.$cookies.get('user')
            this.user = user
            this.body.name = user.firstname+" "+user.lastname
            this.body.phone = user.phone
        },
        createProduct() {
            let validateMsg = this.validateBody(this.body)
            if(validateMsg === "OK"){
                this.isCreating = true
                let body = {
                    "name": this.body.name,
                    "description": this.body.description,
                    "size": this.body.size,
                    "color": this.body.color,
                    "qty": this.body.qty,
                    "price": this.body.price,
                    "url": this.body.url,
                    "customerId": this.user._id,
                    "images": []
                }
                ProductService.createProduct(body).then((response) => {
                    this.isCreating = false
                    if(response.status === 1){
                        this.$toast.success("Create successfully!");
                        this.$router.push({name: 'list-order'})
                    }else{
                        this.$toast.error(response.message.description);
                    }
                })
            }else{
                this.$toast.error(validateMsg);
            }
        },
        validateBody(body) {
            if (!body.name) { return "Name is required." }
            if (!body.size) { return "Size is required." }
            if (!body.color) { return "Color is required." }
            if (parseInt(body.qty) <= 0) { return "Qty is required." }
            if (parseFloat(body.price) <= 0) { return "Price is required." }
            if (!body.url) { return "Url is required." }
            if (!body.description) { return "Description is required." }
            return "OK"
        },
        onLogout(){
            MainService.logout();
        }
    }

}