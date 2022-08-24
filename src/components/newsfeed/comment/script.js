export default {
  name: 'newsfeed-comment',
  props: {
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