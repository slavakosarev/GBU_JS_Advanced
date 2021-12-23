'use strict';

const API_URL = 'http://127.0.0.1:5500/';

Vue.component('good-card', {
  template: `
    <div class="good-card" @click="onClick">
      <h2>{{ data.title }}</h2>
      <p>$ {{ data.price }}</p>
    </div>
  `,
  props: ['data'],
  methods: {
    onClick() {
      fetch(`${API_URL}addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(this.data)
      })
        .then(() => {
          this.$emit('add', this.data)
        })
    }
  }
})

Vue.component('goods-list', {
  template: `
    <div class="goods-list">
      <good-card 
        v-for="good of list" 
        v-bind:key="good.id_product"
        v-bind:data="good"
        v-on:add="addToCart"
      ></good-card>
    </div>
  `,
  props: ['list'],
  methods: {
    addToCart(good) {
      this.$emit('add', good)
    }
  }
})

Vue.component('search', {
  template: `
    <div class="search">
      <input type="text" v-model="searchString" class="goods-search" />
      <button class="search-button" type="button" v-on:click="onClick">Search</button>
    </div>
  `,
  data() {
    return {
      searchString: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('search', this.searchString)
    }
  }
})

Vue.component('cart-item', {
  template: `
    <div class="good-card">
      <h2>{{ data.title }}</h2>
      <p>$ {{ data.price }}</p>
      <button v-on:click="onClick">Delete</button>
    </div>
  `,
  props: ['data'],
  methods: {
    onClick() {
      fetch(`${API_URL}removeFromCart`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(this.data)
      })
        .then(() => {
          this.$emit('delete', this.data)
        })
    }
  }
})

Vue.component('cart', {
  template: `
    <div class="modal">
      <cart-item 
          v-for="good of list" 
          v-bind:key="good.id_product"
          v-bind:data="good"
          v-on:delete="removeFromCart"
        ></cart-item>
        <button v-on:click="onClose">X</button>
    </div>
  `,
  props: ['list'],
  methods: {
    removeFromCart(good) {
      this.$emit('delete', good)
    },
    onClose() {
      this.$emit('close')
    }
  }
})

new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    isVisibleCart: false
  },
  methods: {
    loadGoods() {
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          console.log(data);
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    loadCart() {
      fetch(`${API_URL}cart`)
        .then((request) => request.json())
        .then((data) => this.cart = data.contents)
    },
    addToCart(good) {
      this.cart.push(good)
    },
    removeFromCart(good) {
      const index = this.cart.findIndex((item) => item.id === good.id);
      if (index >= 0) {
        this.cart = [...this.cart.slice(0, index), ...this.cart.slice(index + 1)]
      }
    },
    onSearch() {
      const reg = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter((good) => reg.test(good.title))
    },
    onToggleCart() {
      this.isVisibleCart = !this.isVisibleCart
    }
  },
  mounted() {
    this.loadGoods();
    this.loadCart()
  }
})

const $textReg = document.querySelector('.text').textContent;
const regexp = /\B'|'\B/g;
const $textReg2 = $textReg.replace(regexp, '"');
document.querySelector('.text').textContent = $textReg2;

