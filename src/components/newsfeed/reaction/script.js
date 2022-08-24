export default {
  name: 'newsfeed-reaction',
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