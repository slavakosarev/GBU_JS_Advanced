'use strict';

/**
 *! Максим, для меня это сложная задача, мне нужно больше времени, поэтому успел накидать только примитивную логику работы методов.
 */

class Hamburger {
   constructor(size, stuffing) {
      this.size = size;
      this.stuffing = stuffing;
      this.topping;
   }
    // Добавить добавку
    addTopping(topping) {
       const topp = this.getToppings(topping);
       this.topping = topp;
       return this.topping;
   }
   // Убрать добавку
   removeTopping(topping) {
      remove(topping);
   }
   // Получить список добавок 
   getToppings(topping) {
      let topp = topping;
      const toppList = [
         { topping: 'spices', price: 15, calories: 0 },
         { topping: 'mayonnaise', price: 20, calories: 5 },
      ];
      // for (let i = 0; i < toppList.length; i++) {
      //    if (topp === toppList[i].topping) {
      //       topp = toppList[i];
      //    } else
      //       break;
      // }
      topp = toppList.find(elem => elem.topping === topp);
      return topp;
   }  
    // Узнать размер гамбургера
   getSize() {
      let sz = this.size;
      const sizeList = [
         { size: 'big', price: 100, calories: 40 },
         { size: 'small', price: 50, calories:20 }
      ];
      // for (let i = 0; i < sizeList.length; i++) {
      //    if (sz === sizeList[i].size) {
      //       sz = sizeList[i];
      //    } else
      //       break;
      // }
      sz = sizeList.find(elem => elem.size === sz);
      return sz;
    }  
    // Узнать начинку гамбургера
   getStuffing() {
      let stf = this.stuffing;
      const stuffList = [
         { stuffing: 'cheese', price: 10, calories: 20 },
         { stuffing: 'salad', price: 20, calories: 5 },
         { stuffing: 'potatoes', price: 15, calories: 10 }
      ];
      //   for (let i = 0; i < stuffList.length; i++) {
      //    if (stf === stuffList[i].stuffing) {
      //       stf = stuffList[i];
      //    } else
      //       break;
      // }
      stf = stuffList.find(elem => elem.stuffing === stf);
      return stf;
   }  
   // Узнать цену
   calculatePrice() {
      let size = this.getSize();
      let stuffing = this.getStuffing();
      const sum = size.price + stuffing.price + this.topping.price;
      return sum;
   }
   // Узнать калорийность
   calculateCalories() {
      let size = this.getSize();
      let stuffing = this.getStuffing();
      const amnt = size.calories + stuffing.calories + this.topping.calories;
      return amnt;
   }  
}

const burger = new Hamburger('big', 'cheese');
console.log(burger.addTopping('spices'));
console.log(burger.calculatePrice());
console.log(burger.calculateCalories());



