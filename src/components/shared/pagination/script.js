export default {
  name: 'pagination',
  props: {
      pagination: Object,
      method: {
          type: Function
      }
  },
  data() {
      return {
          inputPage: null,
          sizes: [
              { val: 5, label: 5 },
              { val: 10, label: 10 },
              { val: 25, label: 25 },
              { val: 50, label: 50 },
              { val: 100, label: 100 }
          ],
      }
  },
  components: {

  },
  created() {

  },
  watch: {
      '$route.fullPath': function() {

      }
  },
  computed: {

  },
  methods: {
      async goTo(page) {
          if (page <= this.pagination.totalPage) {
              if (page >= 1) { this.pagination.page = page } else { this.pagination.page = this.pagination.totalPage }
          } else { this.pagination.page = 1 }
          const query = Object.assign({}, this.$route.query);
          query.page = this.pagination.page;
          await this.$router.push({ query });
      },

      async changePageSize() {
          this.$emit("changePageSize")
      }
  }
}