import Helper from "../../../utils/Helper"
import Pagination from "./../../../components/shared/pagination"
import PaymentService from "../../../utils/services/PaymentService"
import ModalPaymentDetail from "./components/modal-payment-detail"

export default {
    name: "admin-payment",
    data() {
        return {
            isFetching: true,
            payments: [],
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
        ModalPaymentDetail,
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

            if (queryPage) { this.pagination.page = parseInt(queryPage) }
            if (querySize) { this.pagination.size = parseInt(querySize) }

            let params = "?page=" + this.pagination.page + "&limit=" + this.pagination.size

            let body = ""

            PaymentService.getPayments(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.payments = []
                    return
                }
                this.payments = response.data.records
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