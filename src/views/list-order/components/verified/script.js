import ProductService from "../../../../utils/services/ProductService"
import ModalPayment from "./modal-payment"

export default {
    name: "pending-payment",
    props: {
       
    },
    data() {
        return {
            isFetching: true,
            isModalPayment: false,
            products: [],
            productSelected: [],
            updateIds: []
        }
    },
    components: {
        ModalPayment
    },
    created() {
        this.getProducts()
    },
    mounted() {

    },
    methods: {
        getProducts() {
            this.isFetching = true
            let body = { status: ['verified'] }
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
        
        onCheckProductId(productId){
            let index = this.updateIds.findIndex(item => item._id == productId)
            return index < 0 ? false : true
        },

        onModalPayment(){
            var indexB = this.indexOf(this.updateIds);
            this.productSelected = this.products.filter( function( el ) {
                return (JSON.stringify(el._id) in indexB);
            });

            this.isModalPayment = true
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

        onClose(status){
            if(status){
                var indexB = this.indexOf(this.updateIds);
                this.products = this.products.filter( function( el ) {
                    return !(JSON.stringify(el._id) in indexB);
                });
            }
            this.updateIds = []
            this.productSelected = []
            this.isModalPayment = false
        }
    }
}