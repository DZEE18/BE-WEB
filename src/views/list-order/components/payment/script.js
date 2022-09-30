import ProductService from "../../../../utils/services/ProductService"
import Pagination from "./../../../../components/shared/pagination"
import Detail from "./modal-detail"
import Timeline from "./../timeline"

export default {
    name: "payment",
    props: {

    },
    data() {
        return {
            isFetching: true,
            modalTimeline: false,
            products: [],
            detail: "",
            pagination: {
                page: 1,
                size: 10,
                totalPage: 0,
                length: 0
            },
        }
    },
    components: {
        Pagination,
        Detail,
        Timeline
    },
    created() {
        this.onFetchData()
    },
    watch: {
        "$route.fullPath": function () {
            this.onFetchData();
        },
    },
    mounted() {

    },
    methods: {
        onFetchData() {
            this.isFetching = true
            let body = { status: ['payment','paymentconfirm'] }
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