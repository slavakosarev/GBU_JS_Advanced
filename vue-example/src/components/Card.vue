<template>
  <div class="card">
    <h3>{{ data.title }}</h3>
    <p>{{ data.price }}$</p>
    <button v-on:click="onClick">{{ action }}</button>
  </div>
</template>

<script>
export default {
  props: ['data', 'action'],
  methods: {
    onClick() {
      this.$emit('action', this.data)
    }
  }
}
</script>