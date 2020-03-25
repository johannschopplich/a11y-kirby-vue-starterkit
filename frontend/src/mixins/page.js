export default {
  data () {
    return {
      page: {},
      pageLoaded: null
    }
  },

  created () {
    // Transform Vue router path into a Kirby path
    const pageId = this.$route.path.substr(1) || 'home'

    // eslint-disable-next-line no-async-promise-executor
    this.pageLoaded = new Promise(async resolve => {
      this.page = pageId === 'home' ? this.$root.$home : await this.$api.getPage(pageId)

      await this.$nextTick()

      resolve()
    })
  },

  async activated () {
    await this.pageLoaded

    this.$emit('update-title', this.page.title)
  }
}
