export default {
  data () {
    return {
      page: {},
      pageUrl: '',
      pageLoaded: null
    }
  },

  created () {
    this.pageUrl = this.$route.path.substr(1) || 'home'

    // eslint-disable-next-line no-async-promise-executor
    this.pageLoaded = new Promise(async resolve => {
      this.page = await this.$api.get(this.pageUrl)

      await this.$nextTick()

      resolve()
    })
  },

  async activated () {
    await this.pageLoaded

    this.$root.pageTitle = this.page.title
    this.$root.currentPage = this.$root.site.children.find(page => page.url === this.pageUrl) || {}
  }
}
