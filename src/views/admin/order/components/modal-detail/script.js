export default {
    name: "modal-detail",
    props: {
       product: Object
    },
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
        onClose(){
            this.$emit('onClose')
        }
    }
}