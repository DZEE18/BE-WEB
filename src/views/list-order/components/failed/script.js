import ProductService from "../../../../utils/services/ProductService"
import Detail from "./modal-detail"

export default {
    name: "failed",
    props: {
       
    },
    data() {
        return {
            isFetching: true,
            products: [],
            detail: ""
        }
    },
    components: {
        Detail
    },
    created() {
        this.getProducts()
    },
    mounted() {

    },
    methods: {
        getProducts() {
            this.isFetching = true
            let body = { status: ['failed'] }
            let params = ""
            ProductService.getProducts(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.products = []
                    return 
                }
                this.products = response.data.records
            })
        }
    }
}