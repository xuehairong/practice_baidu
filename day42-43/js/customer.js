//顾客类
function Customer(name) {
    this.name = name;
}

Customer.prototype.order = function() {
    return new Promise(function(resolve, reject) {
        console.log("顾客" + this.name + "正在点菜中(3s)...");
        setTimeout(function() {
            var foodList = [];
            var count = Math.round(Math.random() * (foods.length - 1))
            while (count > 0) {
                var i = Math.round(Math.random() * (foods.length - 1));
                foodList.push(foods[i]);
                count--;
            }
            resolve(foodList);
        }, 3 * timeUnit);
    });
}
Customer.prototype.eat = function(food) {
    return new Promise(function(resolve, reject) {
        console.log("顾客" + this.name + "正在吃" + food.name + "(3s...)");
        setTimeout(() => {
            resolve(food);
        }, 3 * timeUnit);
    })
}

function Food(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}