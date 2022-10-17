import Helper from "../../../utils/Helper"
import Pagination from "./../../../components/shared/pagination"
import DeliveryService from "../../../utils/services/DeliveryService"
import ModalDetail from "./components/modal-detail"

export default {
    name: "admin-delivery",
    data() {
        return {
            isFetching: true,
            deliveries: [],
            detail: {},
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
        ModalDetail,
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

            let queryPage = this.$route.query.page
            let querySize = this.$route.query.size
            this.type = this.$route.query.type

            if (queryPage) { this.pagination.page = parseInt(queryPage) }
            if (querySize) { this.pagination.size = parseInt(querySize) }

            let params = "?page=" + this.pagination.page + "&limit=" + this.pagination.size

            let body = ""
            if(this.type && this.type != "all"){
                body = { status: [this.type] }
            }

            DeliveryService.getDeliveries(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.deliveries = []
                    return
                }
                this.deliveries = response.data.records
                this.pagination = Helper.customPagination(response.data)
            })
        },

        onClose(){
            this.detail = {}
        },

        async changePageSize() {
            this.pagination.page = 1
            this.onFetchData()
        },
    }
}