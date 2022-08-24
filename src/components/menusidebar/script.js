export default {
    name: 'menusidebar',
    data() {
        return {
            data: {
                user: ""
            },
            display: {
                menu: "dashboard",
                catalog: true,
            },
            drop: false,
            menudslide: {
                catalog: false,
                info: false,
            },
            menus: [
                { img: require('@/assets/icons/all-item.png'), label: "All Items", routeName: "dashboard", children: [] },
                { img: require('@/assets/icons/duck.png'), label: "Duck", routeName: "store", children: [] },
                { img: require('@/assets/icons/rice.png'), label: "Rice", routeName: "product", children: [] },
                { img: require('@/assets/icons/bevarage.png'), label: "Beverage", routeName: "order", children: [] },
                { img: require('@/assets/icons/other.png'), label: "Other", routeName: "order", children: [] },
            ]
        }
    },
    components: {

    },
    created() {
        this.menuActive();
    },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link)
        },
        dorpDown(type) {
            if (type == 'catalog') {
                if (this.menudslide.catalog) {
                    this.menudslide.catalog = false;
                } else {
                    this.menudslide.catalog = true;
                }
            } else {
                if (this.menudslide.info) {
                    this.menudslide.info = false;
                } else {
                    this.menudslide.info = true;
                }
            }
        },
        menuActive() {
            this.data.user = this.$cookies.get('user')
            let menu = this.$root.$route.name;
            if (menu) {
                this.display.menu = menu;
            } else {
                this.display.menu = "dashboard";
            }
        },

        menu(item) {
            this.display.menu = item;
            this.$router.push({ name: item });
        }
    }
}