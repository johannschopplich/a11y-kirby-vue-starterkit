<template>
  <!-- eslint-disable vue/no-v-html -->
  <main id="main">
    <Intro :page-title="page.title" />

    <div class="notes">
      <article v-for="note in page.notes" :key="note.url" class="note">
        <header class="note-header">
          <router-link :to="`/${note.url}`">
            <h2>{{ note.title }}</h2>
            <time>{{ note.date | format('day month year') }}</time>
          </router-link>
        </header>
      </article>
    </div>
  </main>
</template>

<script>
import page from '@/mixins/page'
import { formatDateTime } from '@/mixins/general'
import Intro from '@/components/Intro.vue'

export default {
  name: 'Notes',

  components: {
    Intro
  },

  mixins: [page, formatDateTime]
}
</script>

<style scoped>
.notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1.5rem;
  grid-auto-rows: 1fr;
}
.note {
  border: 2px solid #000;
}
.note a {
  display: block;
  padding: 1rem;
  line-height: 1.25em;
}
.note h2 {
  font-size: 1rem;
}
.note time {
  font-size: 0.75rem;
}
</style>
