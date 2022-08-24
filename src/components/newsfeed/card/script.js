import Reaction from "./../reaction"
import Comment from "./../comment"
import Detail from "./../detail"

export default {
  name: 'newsfeed-card',
  data() {
    return{
      display: {
        modal: {
          like: {
            show : false,
            title: ""
          },
          comment: {
            show : false
          },
          detail: {
            show : false
          }
        }
      }
    }
  },
  components: { 
    Reaction,
    Comment,
    Detail
  },
  methods: {
    modalLike(title){
      this.display.modal.like.show = true
      this.display.modal.like.title = title
    },
    modalComment(){
      this.display.modal.comment.show = true
    },
    modalDetail(){
      this.display.modal.detail.show = true
    },
    closeModal(){
      this.display.modal.like.show = false
      this.display.modal.comment.show = false
      this.display.modal.detail.show = false
      this.display.modal.like.title = ""
    }
  }
}