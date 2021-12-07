'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const $searchInput = document.querySelector('.goods-search');
const $searchBtn = document.querySelector('.search-button');

// ! альтернативный способ запросов на сервер
// https://github.com/ccoenraets/es6-tutorial-data/blob/step3/js/app.js 
function send(url, method = 'GET', data = null, headers = [], timeout = 60000) {
    return new Promise((resolve, reject) => {
        let xhr;
        // Для отправки запросов на сервер в браузер встроен объект XMLHttpRequest
        if (window.XMLHttpRequest) {
            // Chrome, Mozilla, Opera, Safari
            xhr = new XMLHttpRequest();
        }  else if (window.ActiveXObject) { 
            // Internet Explorer
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        // Чтобы определить, куда отправить запрос, используется метод `.open()`
        // Первый параметр - тип запроса
        // Второй параметр - адрес ресурса
        // Третий параметр - указатель асинхронности
        xhr.open(method, url, true);
            headers.forEach((header) => {
            // При отправке запроса можно выставить заголовки. 
            // Заголовки содержат служебную информацию, чтобы серверу было проще обработать запрос
            xhr.setRequestHeader(header.key, header.value);
        })
            // У каждого запроса можно определить таймаут – время, в течение которого мы ждём ответ
            xhr.timeout = timeout;
        // Функция чтобы поймать момент, когда ответ от сервера получен
        // Код внутри выполнится после получения ответа
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 400) {
                resolve(xhr.statusText)
                } else {
                reject(xhr.responseText)
                }
            }
        }
        // Метод `.send()` отправляет запрос
        xhr.send(data);
    })
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

    filterOut(searchString) {
        searchString = searchString.trim();
        if (searchString.length === 0) {
            this.filtred = this.goods;
            this.render();
            return;
        }
        // Создание регулярного выражения через конструктор
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

        //* Запрос с помощью 'Promise()'
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

        //* Запрос с помощью 'send()'
        // send(
        //   (err) => { 
        //     console.log(err.text);
        //   },
        //   (request) => {
        //     this.goods = JSON.parse(request).map(good => ({title: good.product_name, price: good.price}));
        //     this.render();
        //   },
        //   `${API_URL}catalogData.json`
        // );
    }
    _onClick(e) {
        const id = e.target.getAttribute('data-id');
        if (id) {
            fetch(`${API_URL}addToBasket.json`)
                .then(() => {
                    this._cart.addToCart(this.goods.find((good) => good.id == id))
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
    addToCart(good) {
        this._list.push(good);
        this.render();
        this.priceCounter();
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
    // метод определяющий суммарную стоимость
    priceCounter() {
        let sumPrice = 0;
        this._list.forEach(good => {
            sumPrice += good.price;
        });
       console.log(sumPrice);
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
}

const cart = new Cart();
const cartList = new GoodsList(cart);
// обычный поиск
$searchBtn.addEventListener('click', () => {
    cartList.filterOut($searchInput.value);
});
// живой поиск
// $searchInput.addEventListener('input', () => {
//     cartlist.filterOut($searchInput.value);
// });
//* посмотреть id продукта
// document.querySelector('.goods-list').addEventListener('click', (e) => {
//     if (e.target.classList.contains('goods-item')) {
//         const id = e.target.getAttribute('data-id');
//         console.log(id);
//     }
// });
cartList.fetchGoods();
cart.load();

const $textReg = document.querySelector('.text').textContent;
const regexp = /\B'|'\B/g;
const $textReg2 = $textReg.replace(regexp, '"');
document.querySelector('.text').textContent = $textReg2;


