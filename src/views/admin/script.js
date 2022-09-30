import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

export default {
    name: "admin",
    data() {
        return {
            
        }
    },
    components: {
        Navbar,
        Sidebar
    },
    created() {
        this.checkUserRole()
    },
    mounted() {

    },
    methods: {
        checkUserRole(){
            let user = this.$cookies.get('user')
            if(user.role == 'customer'){
                this.$router.push({name: 'home'})
            }
        },
    }
}