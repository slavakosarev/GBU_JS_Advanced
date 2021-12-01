'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const $searchInput = document.querySelector('.goods-search');
const $searchBtn = document.querySelector('.search-button');


function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 60000) {
  let xhr;
  if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      xhr = new XMLHttpRequest();
  }  else if (window.ActiveXObject) { 
      // Internet Explorer
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open(method, url, true);
  headers.forEach((header) => {
      xhr.setRequestHeader(header.key, header.value);
  })
  xhr.timeout = timeout;
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 400) {
          onError(xhr.statusText)
        } else {
          onSuccess(xhr.responseText)
        }
    }
  }
  xhr.send(data);
}

class GoodsItem {
    constructor(title, price, id) {
      this.title = title;
      this.price = price;
      this.id = id;
    }

    render() {
        return `
        <div data-id="${this.id}" class="goods-item">
            <h3>${this.title}</h3>
            <p>${this.price} rub</p>
        </div>`;
    }
}

class GoodsList {
    constructor(cart) {
        this.goods = [];
        this.filtred = [];
        this._cart = cart;
        this._el = document.querySelector('.goods-list');
        this._el.addEventListener('click', this._onClick.bind(this));
    }

    filter(searchString) {
        searchString = searchString.trim();
        if (searchString.length === 0) {
            this.filtred = this.goods;
            this.render();
            return;
        }
        const reg = new RegExp(searchString, 'i');
        this.filtred = this.goods.filter((good) => reg.test(good.title));
        this.render();
    }

    fetchGoods() {
        //* Запрос с помощью Fetch
        fetch(`${API_URL}catalogData.json`)
        .then((response) => {
            return response.json();
        })
        .then((request) => {
            this.goods = request.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
            this.filtred = this.goods;
            this.render();
        })
        .catch((err) => { 
            console.log(err.text);
        })

        //* Запрос с помощью 'Promise'
        // new Promise((resolve, reject) => {
        //   send(reject, resolve, `${API_URL}catalogData.json`)
        // })
        // .then((request) => {
        //   this.goods = JSON.parse(request).map(good => ({title: good.product_name, price: good.price}));
        //!  this.render(); // `render` в обработчике `Promise`
        // })
        // .catch((err) => { 
        //   console.log(err.text)
        // });
        // =====================================================
        // send(
        //   (err) => { 
        //     console.log(err.text);
        //   },
        //   (request) => {
        //     this.goods = JSON.parse(request).map(good => ({title: good.product_name, price: good.price}));
        //     this.render();
        //   },
        //   `${API_URL}catalogData.json`
        // )
    }
    _onClick(e) {
        const id = e.target.getAttribute('data-id');
        if (id) {
            fetch(`${API_URL}addToBasket.json`)
                .then(() => {
                    this._cart.add(this.goods.find((good) => good.id == id))
                });
        }
    }
    render() {
        let listHtml = '';
        this.filtred.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price, good.id);
          listHtml += goodItem.render();
        });
        this._el.innerHTML = listHtml;
    }
}

// const list = new GoodsList();
// list.fetchGoods(() => {
//     list.render();
// });

class CartItem extends GoodsItem {
    constructor(title, price, id) {
        super(title, price, id);
    }
}

class Cart {
    constructor() {
        this._list = [];
        this._btn = document.querySelector('.cart-button');
        this._el = document.querySelector('.cart');
        this._btn.addEventListener('click', this._onToggleCart.bind(this));
        this._el.addEventListener('click', this._onClick.bind(this));
    }
    add(good) {
        this._list.push(good);
        this.render();
    }
    _onClick(e) {
        const id = e.target.getAttribute('data-id');
        fetch(`${API_URL}deleteFromBasket.json`)
            .then(() => {
                const index = this._list.findIndex((good) => good.id == id);
                this._list.splice(index, 1);
                this.render();
            });
    }
    _onToggleCart() {
        this._el.classList.toggle('active');
    }
    render() {
        let listHtml = '';
        this._list.forEach(good => {
            const goodItem = new CartItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        this._el.innerHTML = listHtml;
    }
    load() {
        fetch(`${API_URL}getBasket.json`)
         .then((response) => {
             return response.json();
        })
        .then((goods) => {
            this._list = goods.contents.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
            this.render();
        })
    }
      // метод определяющий суммарную стоимость
    priceCounter() {
        let sumPrice = 0;
        this._list.forEach(good => {
            sumPrice += good.price;
        })
        return sumPrice;
    }
}

const cart = new Cart();
const cartList = new GoodsList(cart);
// живой поиск
$searchBtn.addEventListener('click', () => {
    cartList.filter($searchInput.value);
});
// обычный поиск
// $searchInput.addEventListener('input', () => {
//     list.filter($searchInput.value);
// });
document.querySelector('.goods-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('goods-item')) {
        const id = e.target.getAttribute('data-id');
        console.log(id);
    }
})
cartList.fetchGoods();
cart.load();
console.log(cart.priceCounter());
