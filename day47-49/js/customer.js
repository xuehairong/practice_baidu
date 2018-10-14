    //顾客类
    function Customer(name) {
        this.name = name;
    }
    //入座
    Customer.prototype.sitdown = function() {
        return new Promise(function(resolve, reject) {
            ifeRestaurant.seats--;
            console.log(this.name + "入座,剩余座位：" + ifeRestaurant.seats);
            resolve();
        });
    }
    Customer.prototype.order = function() {
        return new Promise(function(resolve, reject) {
            var time = 3;
            var orderInterval = setInterval(() => {
                if (time === 0) {
					clearInterval(orderInterval);
                    //时间到了返回点单内容
                    var foodList = [];
                    var count = Math.round(Math.random() * (foods.length - 1))
                    while (count > 0) {
                        var i = Math.round(Math.random() * (foods.length - 1));
                        foodList.push(foods[i]);
                        count--;
                    }
                    console.log("点完了");
					showEatStatus("点完了");
					createEatList(foodList);
                    resolve(foodList);

                } else {
					var content="顾客" + this.name + "正在点菜中...剩余" + time + "s";
					showEatStatus(content);
                    console.log(content);
                    time--;
                }
            }, timeUnit);
        });
    }
    Customer.prototype.eat = function(obj) {
        return new Promise(function(resolve, reject) {
            var time = 3;
            var eatInterval = setInterval(() => {
                    if (time === 0) {
						showEatStatus(obj.food.name+"吃完了");
						createEatList(obj.foodList);
                        console.log("吃完了");
                        if (obj.foodList.length == 0) {
                            console.log("顾客" + this.name + "付完钱走了");
                            Customers.shift();
                            ifeRestaurant.seats++;
                            console.log(Customers);
                            if (Customers.length > 0) {
                                Start();
                            }
                        }
                        clearInterval(eatInterval);
                    } else {
						var content="顾客" + this.name + "正在吃" + obj.food.name + "剩余" + time + "s";
						showEatStatus(content);
                        console.log(content);
                        time--;
                    }
                }, timeUnit)
                //不用等顾客吃完
            ifeRestaurant.cash += obj.food.price;
            obj.foodList.shift();
            resolve(obj.foodList);
        });

    }

    function Food(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }