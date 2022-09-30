import Helper from "../../../utils/Helper"
import GroupOrderService from "../../../utils/services/GroupOrderService"
// import Timeline from "./components/timeline"
import Pagination from "./../../../components/shared/pagination"
import ProductService from "../../../utils/services/ProductService"
import ModalDetail from "./components/modal-detail"

export default {
    name: "admin-order",
    data() {
        return {
            isFetching: true,
            orderType: "", //cart, checkout
            orders: [],
            detail: {},
            updateIds: [],
            search: {
                orderType: "",
                query: "",
            },
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
        // Timeline,
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
            this.search.orderType = this.$route.query.orderType ? this.$route.query.orderType : ""

            if (queryPage) { this.pagination.page = parseInt(queryPage) }
            if (querySize) { this.pagination.size = parseInt(querySize) }

            let params = "?page=" + this.pagination.page + "&limit=" + this.pagination.size
            if (this.search.query) { params = params + "&query=" + this.search.query }

            let body = this.search.orderType ? { status: this.search.orderType} : null

            GroupOrderService.getGroupOrders(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.orders = []
                    return
                }
                this.orders = response.data.records
                this.pagination = Helper.customPagination(response.data)
            })
        },

        onUpdateProductTo(productIndex){
            let user = this.$cookies.get('user')
            let product = this.detail.itemList[productIndex]
            let body = {
                "_ids": [product._id],
                "customerId": user._id,
                "status": "verified"
            }
            ProductService.updateStatus(body).then(response => {
                if(response.status === 0){
                    this.$toast.error(response.message.description)
                    return
                }
                this.detail.itemList[productIndex].verified = "true"
            })
        },

        indexOf(arr) {
            return arr.reduce(function(acc, item){
                return acc[JSON.stringify(item)] = item, acc
            }, {});    
        },

        onSelectProduct(productId){
            let index = this.updateIds.findIndex(item => item == productId)
            if(index < 0){
                this.updateIds.push(productId)
            }else{
                this.updateIds = this.updateIds.filter(item => item != productId)
            }
        },

        onCheckProductId(productId){
            let index = this.updateIds.findIndex(item => item._id == productId)
            return index < 0 ? false : true
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