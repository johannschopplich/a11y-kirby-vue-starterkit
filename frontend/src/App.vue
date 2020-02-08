<template>
  <div id="app">
    <router-link
      ref="skiplink"
      to="#main"
      class="skiplink"
      @click.native="scrollFix('#main')"
    >
      Skip to content
    </router-link>

    <div class="page">
      <Header />

      <keep-alive>
        <router-view :key="$route.path.substr(1) || 'home'" />
      </keep-alive>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data () {
    return {
      swRefreshing: false
    }
  },

  watch: {
    $route () {
      this.$nextTick(() => {
        // Page title will be already set by page mixin
        this.setRouteAnnouncement(document.title)
        this.setRouteFocus()
        this.setAriaCurrent()
      })
    }
  },

  created () {
    // Listen for the `ServiceWorkerUpdated` event and display refresh snackbar as required
    document.addEventListener('ServiceWorkerUpdated', this.swUpdateAvailable, { once: true })

    // Refresh all open app tabs when a new service worker is installed
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.swRefreshing) return
      this.swRefreshing = true
      window.location.reload()
    })
  },

  mounted () {
    this.setAriaCurrent()
    // https://stackoverflow.com/a/45206192
    setTimeout(() => this.scrollFix(this.$route.hash), 2)
  },

  methods: {
    scrollFix (hashbang) {
      if (hashbang) window.location.hash = hashbang
    },

    setRouteAnnouncement (pagetitle) {
      this.$announcer.set(`Current page: ${pagetitle}`)
    },

    setRouteFocus () {
      this.$refs.skiplink.$el.focus()
    },

    setAriaCurrent () {
      this.$nextTick(() => {
        const oldCurrents = this.$el.querySelectorAll('[aria-current]')
        const newCurrents = this.$el.querySelectorAll('.router-link-exact-active')

        oldCurrents && oldCurrents.forEach(current => {
          current.removeAttribute('aria-current')
        })

        newCurrents && newCurrents.forEach(current => {
          current.setAttribute('aria-current', 'page')
        })
      })
    },

    swUpdateAvailable (registration) {
      if (!registration || !registration.waiting) return
      // The new service worker is installed, but not active until message is posted
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_helpers";

:root {
  --content-width: 65rem;
}

*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
}

li {
  list-style: none;
}

a {
  color: currentColor;
  text-decoration: none;
}

strong,
b {
  font-weight: 500;
}

img {
  width: 100%;
}

.page {
  padding: 5vh 5vw 10vh;
}
.page > * {
  max-width: var(--content-width);
  margin: 0 auto;
}

main {
  min-height: calc(100vh - 10rem);
}

.tags {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-size: 0.75rem;
  font-weight: 600;
}

.text {
  line-height: 1.5em;
}
.text p,
.text figure,
.text ul,
.text ol {
  margin-bottom: 1.5em;
}
.text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.text > *:first-child {
  margin-top: 0;
}
.text a {
  position: relative;
  white-space: nowrap;
  font-weight: 500;
  z-index: 1;
  display: inline-block;
  border-bottom: 2px solid #000;
}
.text figure {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.text img {
  width: 100%;
}
</style>
