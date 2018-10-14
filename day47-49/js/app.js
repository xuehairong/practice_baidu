/**开始运作餐厅**/
var timeUnit = 1000; //时间单位为1秒
var Customers = ['a', 'b', 'c', 'd'];
var foods = [{
    name: "红烧肉",
    price: 25,
    time: 5
}, {
    name: "土豆丝",
    price: 15,
    time: 4
}, {
    name: "青菜",
    price: 10,
    time: 6
}, {
    name: "鸡腿",
    price: 20,
    time: 7
}];
var ifeRestaurant = new Restaurant({
    cash: 0,
    seats: 1,
    staff: []
});

var newCook = Cook.getInstance("Tony", 10000);
ifeRestaurant.hire(newCook);
var newWaiter = Waiter.getInstance("waiter1", 8000);
ifeRestaurant.hire(newWaiter);

function Start() {
    var customer = new Customer(Customers[0]);
    customer.sitdown() //入座
        .then(customer.order) //点单
        .then(newWaiter.work) //服务员点单
        .then(
            function(foodList) {
                console.log(foodList);
                let p = new Promise(function(resolve, reject) {
                    resolve(foodList)
                });
                //循环做菜、上菜、做菜、吃菜（吃菜不用等吃完就做下一个菜）
                foodList.forEach(element => {
                    p = p.then(newCook.work)
                        .then(newWaiter.work)
                        .then(customer.eat);
                });
            }
        )
}

Start();