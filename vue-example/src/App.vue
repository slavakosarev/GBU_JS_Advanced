<template>
  <div id="app">
    <router-link to="/">Главная</router-link>
    <br />
    <router-link to="/cart">Корзина</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchShowCase')
    this.$store.dispatch('fetchCart')
  }
}
</script>


<style lang="scss">

</style>
