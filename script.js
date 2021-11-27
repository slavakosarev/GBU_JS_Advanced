'use strict';

class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price} rub</p></div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
        this.goods = [
          { title: 'Shirt', price: 150 },
          { title: 'Socks', price: 50 },
          { title: 'Jacket', price: 350 },
          { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    // метод определяющий суммарную стоимость
    priceCounter() {
        let sumPrice = 0;
        this.goods.forEach(good => {
            sumPrice += good.price;
        })
        return sumPrice;
    }

}  

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(`Суммарная стоимость товаров ${list.priceCounter()} rub`);


//конструктор для корзины
class CartList {
    constructor() {
        this.product = product;
        this.amount = amount;
        this.price = price;
    }
    getProducts() {
        return
    }
    amountCounter() {
        return
    }
    priceCounter() {
        return
    }
    totalPrice() {
        return
    }
    delFromCart() {
        return
    }
}

// коструктор для единицы товара в корзине
class CartItem {
    constructor() {
        this.name = name;
        this.price = price;
    }
    addToCart() {
        return
    }
    addQty() {
        return
    }
}

