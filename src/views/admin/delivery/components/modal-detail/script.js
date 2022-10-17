export default {
    name: "modal-detail",
    props: {
       delivery: Object
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