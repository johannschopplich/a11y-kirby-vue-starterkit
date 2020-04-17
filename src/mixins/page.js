export default {
  data () {
    return {
      page: null
    }
  },

  created () {
    // Transform route path to pageId for use with api
    const path = this.$route.path
    const pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

    // Prevent homepage from being fetched twice since it's already available
    if (pageId === 'home') {
      this.page = new Promise(resolve => resolve(this.$home))
        .then(page => (this.page = page))
    } else {
      this.page = this.$api
        .getPage(pageId)
        .then(page => (this.page = page))
        .catch(async () => (this.page = await this.$api.getPage('error')))
    }
  },

  async activated () {
    await this.page

    // Set document title and route announcement
    document.title = this.page.metaTitle
    this.$announcer.set(`Current page: ${this.page.title}`)

    this.$emit('route-changed')
  }
}
