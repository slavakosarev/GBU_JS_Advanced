<template>
  <div class="home">
    <Search />
    <ShowCase />
  </div>
</template>

<script>
import Search from '../components/Search.vue'
import ShowCase from '../components/ShowCase.vue'

export default {
  name: 'Home',
  components: {
    Search,
    ShowCase
  }
}
</script>
