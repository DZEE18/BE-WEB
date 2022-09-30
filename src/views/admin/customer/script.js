import Helper from "../../../utils/Helper"
import Pagination from "./../../../components/shared/pagination"
import UserService from "../../../utils/services/UserService"
import ModalDetail from "./components/modal-detail"

export default {
    name: "admin-customer",
    data() {
        return {
            isFetching: true,
            customers: [],
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

            if (queryPage) { this.pagination.page = parseInt(queryPage) }
            if (querySize) { this.pagination.size = parseInt(querySize) }
            let params = "?page=" + this.pagination.page + "&limit=" + this.pagination.size
            let body = {
                role: "customer"
            }

            UserService.getUsers(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.customers = []
                    return
                }
                this.customers = response.data.records
                this.pagination = Helper.customPagination(response.data)
            })
        },

        async changePageSize() {
            this.pagination.page = 1
            this.onFetchData()
        },
    }
}