<template>
  <div class="search">
    <input type='text' v-model="searchStr">
  </div>
</template>

<script>
export default {
  computed: {
    searchStr: {
      get() {
        return this.$store.getters.getSearchString
      },
      set(value) {
        this.$store.commit('setFilter', value)
      }
    }
  } 
  
}
</script>