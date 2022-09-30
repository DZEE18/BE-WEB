import ProductService from "../../../../utils/services/ProductService"
import Detail from "./modal-detail"
import Timeline from "./../timeline"

export default {
    name: "completed",
    props: {
       
    },
    data() {
        return {
            isFetching: true,
            modalTimeline: false,
            products: [],
            detail: ""
        }
    },
    components: {
        Detail,
        Timeline
    },
    created() {
        this.getProducts()
    },
    mounted() {

    },
    methods: {
        getProducts() {
            this.isFetching = true
            let body = { status: ['completed'] }
            let params = ""
            ProductService.getProducts(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.products = []
                    return 
                }
                this.products = response.data.records
            })
        },
        showModalTimeline(detail){
            this.modalTimeline = true
            this.detail = detail
        },
        closeModal(){
            this.modalTimeline = false
            this.detail = ""
        }
    }
}