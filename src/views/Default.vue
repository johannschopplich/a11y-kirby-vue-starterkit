<template>
  <!-- eslint-disable vue/no-v-html -->
  <main id="main">
    <Intro :title="page.title" />

    <div v-if="page.text" class="text" v-html="page.text.html" />
  </main>
</template>

<script>
import page from '@/mixins/page'
import Intro from '@/components/Intro.vue'

export default {
  name: 'Default',

  components: {
    Intro
  },

  mixins: [page]
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
