import Helper from "../../../utils/Helper"
import ProductService from "../../../utils/services/ProductService"
import Pagination from "./../../../components/shared/pagination"
import Detail from "./components/modal-detail"
import ModalVerified from "./components/modal-verified"
import ModalPayment from "./components/modal-payment"
import ModalConfirmPayment from "./components/modal-confirmpayment"
import ModalProcess from "./components/modal-process"
import ModalTracking from "./components/modal-tracking"

export default {
    name: "admin-product",
    data() {
        return {
            isFetching: true,
            isUpdating: false,
            type: "requestOrder", //cart, requestOrder
            products: [],
            detail: {},
            updateIds: [],
            modalStatus: "",
            productStatus: [
                {val: "requestOrder", label: "Request Order", isCheckbox: true},
                {val: "verified", label: "Verified", isCheckbox: false},
                {val: "payment", label: "Payment", isCheckbox: false},
                {val: "paymentconfirm", label: "Confirmed", isCheckbox: true},
                {val: "process", label: "Process", isCheckbox: false},
                {val: "warehouse", label: "Warehouse", isCheckbox: true},
                {val: "arrivepp", label: "Arrvied PP", isCheckbox: true},
                {val: "scanin", label: "Scan In", isCheckbox: true},
                {val: "deliver", label: "Deliver", isCheckbox: true},
                {val: "completed", label: "Completed", isCheckbox: true},
                {val: "failed", label: "Failed", isCheckbox: true},
                {val: "return", label: "Return", isCheckbox: true},
            ],
            search: {
                orderType: "requestOrder",
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
        Detail,
        ModalVerified,
        ModalPayment,
        ModalConfirmPayment,
        ModalProcess,
        ModalTracking
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

            ProductService.getProducts(body,params).then((response) => {
                this.isFetching = false
                if(response.status === 0){
                    this.products = []
                    return
                }
                this.products = response.data.records
                this.pagination = Helper.customPagination(response.data)
            })
        },

        onUpdateProductTo(status, index){
            if(!this.checkCheckbox(status)){
                this.detail = this.products[index]
                this.modalStatus = status
                return
            }
            let user = this.$cookies.get('user')
            let product = this.products[index]
            let body = {
                "_ids": [product._id],
                "customerId": user._id,
                "status": status
            }
            ProductService.updateStatus(body).then(response => {
                if(response.status === 0){
                    this.$toast.error(response.message.description)
                    return
                }
                this.$toast.success(response.message.description)

                // remove products record where ids in updateIds
                this.products.splice(index,1)
            })
        },

        onUpdateProductStatus(status){
            this.isUpdating = true
            let user = this.$cookies.get('user')
            let body = {
                "_ids": this.updateIds,
                "customerId": user._id,
                "status": status
            }
            ProductService.updateStatus(body).then(response => {
                this.isUpdating = false
                if(response.status === 0){
                    this.$toast.error(response.message.description)
                    return
                }
                this.$toast.success(response.message.description)

                // remove products record where ids in updateIds
                var indexB = this.indexOf(this.updateIds);
                this.products = this.products.filter( function( el ) {
                    return !(JSON.stringify(el._id) in indexB);
                } );
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

        checkStatus(status){
            let productStatusIndex = this.productStatus.findIndex(productStatus => productStatus.val == status)
            if(productStatusIndex > -1){
                return this.productStatus[productStatusIndex+1]
            }
            return "N/A"
        },

        checkCheckbox(status){
            if(this.$route.query.type == "all" || !this.$route.query.type){ return false }
            let productStatusIndex = this.productStatus.findIndex(productStatus => productStatus.val == status)
            if(productStatusIndex > -1){
                return this.productStatus[productStatusIndex].isCheckbox
            }
            return false
        },

        checkTracking(status){
            let index = this.productStatus.findIndex( productStatus => productStatus.val == status)
            console.log(index)
            //allow to input tracking from status process
            return index > 3 ? true : false
        },

        showModalTracking(productIndex){
            this.modalStatus = "tracking"
            this.detail = this.products[productIndex]
        },

        async changePageSize() {
            this.pagination.page = 1
            this.onFetchData()
        },

        onClose(){
            this.modalStatus = ""
            this.detail = {}
        },

        onSuccess(){
            if(!this.modalStatus != "tracking"){
                let index = this.products.findIndex(product => product._id == this.detail._id)
                if(index > -1){
                    this.products.splice(index,1)
                }
            }
            this.modalStatus = ""
            this.detail = {}
        }
    }
}