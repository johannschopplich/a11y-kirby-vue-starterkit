<template>
  <!-- eslint-disable vue/no-v-html -->
  <main id="main">
    <Intro :page-title="page.title" />

    <div class="text">
      <span v-html="page.text" />
    </div>
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
