export default {
  data () {
    return {
      page: {},
      pageLoaded: null
    }
  },

  created () {
    // eslint-disable-next-line no-async-promise-executor
    this.pageLoaded = new Promise(async resolve => {
      this.page = await this.$api.getPage(this.$route.path.substr(1))

      await this.$nextTick()

      resolve()
    })
  },

  async activated () {
    await this.pageLoaded

    this.$emit('update-title', this.page.title)
  }
}
