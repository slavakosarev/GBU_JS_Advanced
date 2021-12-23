<template>
  <div class="cart">
    <Card v-for="good of list" v-bind:key="good.id" v-bind:data="good" v-bind:action="'Удалить'" v-on:action="onRemoveFromCart" />
  </div>
</template>

<script>
import Card from '../components/Card.vue'
export default {
  components: { Card },
  computed: {
    list() {
      return this.$store.getters.getCart
    }
  },
  methods: {
    onRemoveFromCart(good){
      this.$store.dispatch('removeFromCart', good.id)
    }
  }
}
</script>