import Menusidebar from './../menusidebar'
// import Service from './../../utils/api/service'

export default {
    name: 'navbar',
    data() {
        return {
            ani: false,
            popupshow: {
                profile: false,
                sidebar: false,
            },
        }
    },
    components: {
        Menusidebar
    },
    created() {

    },
    methods: {
        popup(type) {
            if (type == "profile") {
                this.popupshow.profile = true
                this.ani = false
            } else if (type == 'sidebar') {
                this.popupshow.sidebar = true
            } else {
                this.popupshow.profile = false
                this.popupshow.sidebar = false
                this.ani = false;
            }
        },
        closemodel() {
            this.popupshow.profile = false
            this.popupshow.sidebar = false
            this.ani = true
        },
        menu(item) {
            this.$router.push({ name: item });
            this.popupshow.profile = false
        },
        logout() {
            this.$router.push({ name: 'login' })
        }
    }
}