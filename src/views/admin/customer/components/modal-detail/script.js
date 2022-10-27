export default {
    name: "modal-detail",
    props: {
       item: Object
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