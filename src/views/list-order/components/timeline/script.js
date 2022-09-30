export default {
    name: "timeline",
    props: {
        detail: Object
    },
    data() {
        return {
            
        }
    },
    components: {},
    created() {

    },
    methods: {
        onClose(){
            this.$emit('onClose')
        }
    },
    mounted() {

    }
}