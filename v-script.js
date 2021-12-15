'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

new Vue({
   el: '#app',
   data: {
      goods: [],
      filteredGoods: [],
      cart: [],
      searchLine: '',
      isVisibleCart: false
   },
   methods: {
      loadGoods() {
         fetch(`${API_URL}catalogData.json`)
            .then((request) => request.json()) 
            .then((data) => {
               console.log(data);
               this.goods = data;
               this.filteredGoods = data;
         })
      },
      loadCart() {
         fetch(`${API_URL}getBasket.json`)
            .then((request) => request.json())
            .then((data) => this.cart = data.contents)
      },
      addToCart() {
         fetch(`${API_URL}addToBasket.json`)
         .then(() => this.cart.push(good))
      },
      removeFromCart(good) {
         fetch(`${API_URL}deleteFromBasket.json`)
            .then(() => {
               const index = this.cart.findIndex((item) => item.id_product == good.id_product);
               this.cart.splice(index - 1, 1)
         })
      },
      onSearch() {
         const reg = new RegExp(this.searchLine, 'i');
         this.filteredGoods = this.goods.filter((good) => reg.test(good.product_name))
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

const $form = document.querySelector('.form');
const $name = document.querySelector('#name');
const $phone = document.querySelector('#phone');
const $mail = document.querySelector('#mail');
const $error = document.querySelector('.empty-inputs');

const nameRegexp = /^[A-Za-z]+$/;
const phoneRegexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
const mailRegExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

$form.addEventListener('input', event => {
    if ($name.value === '' && $phone.value === '' && $mail.value === '') {
        event.preventDefault();
        $error.innerText = 'Пожалуйста, заполните поля ввода!';
    }
    if ($name.value !== '' && nameRegexp.test($name) === false) {
        event.preventDefault();
        $name.style.outline = '3px solid red';
        $name.nextElementSibling.innerText = 'Имя должно содержать только буквы!'
    }
    if ($phone.value !== '' && phoneRegexp.test($phone) === false) {
        event.preventDefault();
        $phone.style.outline = '3px solid red';
        $phone.nextElementSibling.innerText = 'Формат ввода +7(000)000-0000';
    }
    if ($mail.value !== '' && mailRegExp.test($mail) === false) {
        event.preventDefault();
        $mail.style.outline = '3px solid red';
        $mail.nextElementSibling.innerText = 'Формат ввода E-mail mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru';
    }
});
function checkInputs() {
    $form.addEventListener('submit', event => {
        const arr = [nameRegexp, phoneRegexp, mailRegExp];
        arr.forEach(elem => {
            if (event.target.value !== '' && elem.test(event.target) === true) {
                event.target.style.removeProperty('outline');
                event.target.nextElementSibling.innerText = '';
                $error.innerText = '';
            }
        });
    });
}
checkInputs($name, $phone, $mail);
