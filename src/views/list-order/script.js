import ProductService from './../../utils/services/ProductService'
import MainService from "./../../utils/services/MainService"
import Timeline from "./components/timeline"

export default {
    name: "list-order",
    data() {
        return {
            isLoading: true,
            orders: [],
            detail: {}
        }
    },
    components: {
        Timeline
    },
    created() {
        this.getProducts()
    },
    methods: {
        getProducts() {
            this.isLoading = true
            let body = {}
            let params = ""
            ProductService.getProducts(body,params).then((response) => {
                this.isLoading = false
                if(response.status === 1){
                    this.orders = response.data.records
                }else{
                    this.$toast.error(response.message.description);
                }
            })
        },

        onLogout(){
            MainService.logout();
        }
    },
    mounted() {

    }
}