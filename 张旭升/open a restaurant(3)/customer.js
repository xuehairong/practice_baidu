//顾客类
let customerSpan = document.getElementById('customer-speak');
let money = 0;

function Customer(name) {
    this.name = name;

}

Customer.prototype = {
        constructor: Customer,
        eat: function(array) {
            let menu = array[0];
            let time = 10;
            let cusSpan = document.getElementById('customer-speak');
            let waiterSpan = document.getElementById('waiter-speak');
            return new Promise(function(resolve, reject) {
                let timer = setInterval(function() {
                    if (time === 0) {
                        console.log('吃完了！');
                        cusSpan.innerHTML = '吃完了！';
                        if (array.length === 0) {
                            waiterSpan.innerHTML = '顾客付了' + money + '元, 走了！';
                        }
                        clearInterval(timer);
                    } else {
                        console.log('还剩下：' + time + '秒 吃完' + menu.name);
                        cusSpan.innerHTML = '还剩下: ' + time + '秒 吃完' + menu.name;
                        time--;
                    }
                }, 1000);
                money += array[0].price;
                array.shift();
                resolve(array);
            });
        },

        //点菜
        order: function(menu) {
            let len = Math.floor(Math.random() * 4 + 1); //除去随机出现0个的
            let array = [];
            for (let i = 0; i < len; i++) {
                array.push(Math.floor(Math.random() * 4));
            }
            //数组去重
            let r = array.filter(function(element, index, self) {
                return self.indexOf(element) === index;
            });
            array = [];
            for (let i = 0; i < r.length; i++) {
                array.push(menu[r[i]]);
            }
            return array;
        },
        //入座
        seat: function(menuArray) {
            return new Promise(function(resolve, reject) {
                // cus = object.name;
                // menuArray = object.menuArray
                // console.log('顾客' + cus.name + '入座了！');
                let count = 3;
                let timer = setInterval(function() {
                    if (count === 0) {
                        clearTimeout(timer);
                        customerSpan.innerHTML = '点完了！';
                        cusExist = false;
                        resolve(menuArray);
                    } else {
                        customerSpan.innerHTML = '还剩下' + count + '秒点完菜';
                        count--;
                    }
                }, 1000);

            });
            console.log('当前座位为：0');
            console.log('你看，你吃什么菜，我们这有红烧肉、土豆肉片、小酥肉、蒸熊掌！');
        },
        leave: function(array) {
            console.log('顾客' + this.name + '走了！');
            array.shift();
            console.log('-----------分割线----------');
        },
        time: function() {

        }
    }
    //实例顾客