export default {
  data () {
    return {
      page: {},
      pageLoaded: null
    }
  },

  created () {
    const id = this.$route.path.substr(1) || 'home'

    // eslint-disable-next-line no-async-promise-executor
    this.pageLoaded = new Promise(async resolve => {
      this.page = id === 'home' ? this.$home : await this.$api.getPage(id)

      await this.$nextTick()

      resolve()
    })
  },

  async activated () {
    await this.pageLoaded

    this.$emit('update-title', this.page.title)
  }
}
