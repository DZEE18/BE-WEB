import MainService from "./../../utils/services/MainService"
// import Timeline from "./components/timeline"
import Cart from "./components/cart"
import ProductRequested from "./components/product-requested"
import Verified from "./components/verified"
import Payment from "./components/payment"
import Process from "./components/process"
import Completed from "./components/completed"
import Failed from "./components/failed"

export default {
    name: "list-order",
    data() {
        return {
            orderType: "cart", //cart, requestOrder
        }
    },
    components: {
        // Timeline,
        Cart,
        ProductRequested,
        Verified,
        Payment,
        Process,
        Completed,
        Failed
    },
    created() {
        this.checkUserRole()
        this.onCheckOrderType()
    },
    watch: {
        "$route.fullPath": function() {
            this.onCheckOrderType()
        },
    },
    mounted() {

    },
    methods: {
        checkUserRole(){
            let user = this.$cookies.get('user')
            if(user.role == 'admin'){
                this.$router.push({name: 'admin'})
            }
        },

        onCheckOrderType(){
            this.orderType = this.$route.query.orderType ? this.$route.query.orderType : "cart"
        },
        onLogout(){
            MainService.logout();
        }
    }
}