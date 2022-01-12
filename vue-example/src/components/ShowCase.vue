<template>
  <div class="showcase">
    <Card v-for="good of list" v-bind:key="good.id" v-bind:data="good" v-bind:action="'Купить'" v-on:action="onAddToCart" />
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  components: { Card },
  computed: {
    list() {
      return this.$store.getters.getShowCase
    }
  },
  methods: {
    onAddToCart(good){
      this.$store.dispatch('addToCart', good)
    }
  }
}
</script>