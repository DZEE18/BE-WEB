import Helper from "../../../utils/Helper"
import Pagination from "./../../../components/shared/pagination"
import UserService from "../../../utils/services/UserService"
import ModalDetail from "./components/modal-detail"
import ModalCreate from "./components/modal-create"
import ModalUpdate from "./components/modal-update"

export default {
    name: "admin-customer",
    data() {
        return {
            isFetching: true,
            isModalCreate: false,
            updateIndex: -1,
            customers: [],
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
        ModalCreate,
        ModalUpdate
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

        onCreateSuccess(response){
            this.customers.unshift(response)
            this.isModalCreate = false
            this.$toast.success("Create successfully!")
        },

        onUpdateSuccess(response){
            this.customers[this.updateIndex] = response
            this.updateIndex = -1
            this.detail = {}
            this.$toast.success("Update successfully!")
        },

        showModalUpdate(customerIndex){
            this.detail = this.customers[customerIndex]
            this.updateIndex = customerIndex
        },

        async changePageSize() {
            this.pagination.page = 1
            this.onFetchData()
        },
    }
}