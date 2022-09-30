import MainService from "../../../../utils/services/MainService";

export default {
    name: "admin-navbar",
    data() {
        return {
            
        }
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        onLogout(){
            MainService.logout();
        }
    }
}