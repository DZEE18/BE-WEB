export default {
  name: 'newsfeed-detail',
  props: {
    title: String,
    callback: {
      type: Function,
      default: () => {}
    }
  },
  components: { 
    
  },
  methods: {
    closeModal(){
      this.callback()
    }
  }
}