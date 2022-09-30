import ProductService from "../../../../utils/services/ProductService"

export default {
    name: "cart",
    props: {
       
    },
    data() {
        return {
            isFetching: true,
            products: [],
            updateIds: []
        }
    },
    components: {},
    created() {
        this.getProducts()
    },
    mounted() {

    },
    methods: {
        getProducts() {
            this.isFetching = true
            let body = { status: ['cart'] }
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

        onUpdateProductTo(type){
            let user = this.$cookies.get('user')
            let body = {
                "_ids": this.updateIds,
                "customerId": user._id,
                "status": type
            }
            ProductService.updateStatus(body).then(response => {
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
    }
}