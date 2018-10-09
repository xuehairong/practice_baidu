//创建单例餐厅
var getRestaurant = (function() {
    var instance = null;
    function Restaurant(args) {
        var args = args || {};
        this.cash = args.cash || 20000;
        this.seats = args.seats || 1;
        this.staffs = args.staffs || [];
    }; 
    Restaurant.prototype = {
        constructor: Restaurant,
        hire: function(staff) {
            this.staffs.push(staff.name);
        },
        dismiss: function(staff) {
            var tem = this.staffs.indexOf(staff.name);
            if(tem > -1) {
                this.staffs.splice(tem, 1)
            }
        }
    };
    return {
        name: "Restaurant",
        getInstance: function(cash, seats, staffs) {
            if(instance === null) {
                instance = new Restaurant(cash, seats, staffs)
            };
            return instance;
        }
    }
})();

//创建职员
function Staff(name, salary) {
    this.name = name;
    this.salary = salary;
};

//创建服务员
function Waiter(name, salary) {
    Staff.call(this, name, salary)
};
Waiter.prototype.constructor = Waiter;
Waiter.prototype.work = function(thing) {
    if(Array.isArray(thing)) {
        console.log('点菜');
        var x = new Customer();
        var foots = x.order(thing)
        console.log(foots); 
        return foots;      
    } else {
        console.log("上菜：" + thing);
    }
};
Waiter.getInstance = (function(){
    var instance = null;
    return function(name, salary){
        if (instance === null){
            instance = new Waiter(name, salary);
        }
        return instance;
    }
})();

//创建厨师
function Cooker(name, salary) {
    Staff.call(this, name, salary)
};
Cooker.prototype.work = function(foot) {       
     
    var dish = foot.name;
    console.log(dish + '做好了！');
    return dish;
    
};
Cooker.getInstance = (function(){
    var instance = null;
    return function(name, salary){
        if (instance === null){
            instance = new Cooker(name, salary);
        }
        return instance;
    }
})();

//创建顾客
function Customer(name) {
    this.name = name;
};
Customer.prototype = {
    constructor : Customer,
    order: function() {
        let foots = [];
        let n = Math.floor(Math.random()*(menu.length));
        if(n == 0) {
            foots.push(menu[0]) 
        } else {
            for(var i = 0; i < n; i++) {
                let tem = Math.floor(Math.random()*(menu.length));
                foots.push(menu[tem]) 
            }    
        }
        return foots;
    },
    eat: function(foot) {
        console.log('开始吃' + foot); 
    },
    pay: function(foots) {
        var num = 0;
        for(let foot of foots) {
            num += foot.price;
        }
        console.log("吃完掏钱！！！")
        console.log(num);
        return num;
    }
}

//菜品类
function Dish(name, cost, price, cookTime) {
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.cookTime = cookTime;
}

var a = new Dish("烧白菜", 5, 10, 3);
var b = new Dish("溜肥肠", 10, 20, 4);
var c = new Dish("大盘鸡", 15, 30, 5);
var d = new Dish("水煮鱼", 20, 40, 6);

var menu = [a, b, c, d];

var customer = ["小赵", "小钱", "小孙", "小李"]

var oBtn = document.getElementById("btn");
var oCustomerList = document.getElementsByClassName('customer-list')[0];
var oCustomer = document.getElementsByClassName("customer");
var oWaiter = document.getElementsByClassName("waiter")[0];
var oRestaurant = document.getElementById("restaurant")
var oCash = document.getElementById('cash');
var cookerState = document.getElementById('cooker-state');
var aSpan = cookerState.getElementsByTagName('span');
var customerState = document.getElementById('customer-state');
var cuLi = customerState.getElementsByTagName('li');
var cuSpan = customerState.getElementsByTagName('span');


var index = 0;
var restaurant = getRestaurant.getInstance({
    cash: 100000,
    seats: 1,
    staffs: []
});
var waiter = Waiter.getInstance("waiter", 3000);
var cooker = Cooker.getInstance("cooker", 5000);
restaurant.hire(waiter);
restaurant.hire(cooker);
oCash.innerHTML = restaurant.cash;

oBtn.onclick = run;

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
};

function run() {
  
    if (index == customer.length) {
        return;
    }

    console.log("创建顾客");
    var newCustomer = new Customer(customer[index]);

    console.log("客人进餐厅！");
    oRestaurant.appendChild(oCustomer[0]);
    oCustomer[0].style.position = "absolute";
    oCustomer[0].style.left = 350 + "px";
    oCustomer[0].style.top = 300 + "px";

    index++;

    console.log("服务员去点菜");
    oWaiter.style.transition = "0.5s"

    setTimeout(function() {
        oWaiter.style.top = 250 + "px";
        oWaiter.style.left = 200 + "px"; 
    }, 500)
    sleep(500);


    console.log("顾客正在想吃什么！");
    new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(waiter.work(menu))
        }, 3000)
    })
    .then(function(foots) {
        customerState.innerHTML = "<li>等菜中！！！</li>"
        console.log("服务员把菜单给厨师！");
        setTimeout(function() {
            oWaiter.style.top = 0 + "px";
            oWaiter.style.left = 0 + "px";   
        }, 500)
        sleep(500);
        cookerState.innerHTML = "";
        for(var i in foots) {
            cookerState.innerHTML += "<li>第" + (parseInt(i) + 1) + "道菜："+ foots[i].name + "</br>剩余烹饪时间：<span>" + foots[i].cookTime + "s</span></li>"
        }

        let n = 0;
        cookEvery(foots)
        function cookEvery(foots) {
            let newFoot = foots[n]; 
            n++;
            new Promise(function(resolve, reject) {
                console.log("厨师开始做第" + n + "道菜！");
                var cookTime = newFoot.cookTime
                var timers = setInterval(function() {
                    if(cookTime == 1) {
                        aSpan[n - 1].innerHTML = "已做好";
                    } else {
                        aSpan[n - 1].innerHTML = --cookTime + "s";
                    }                    
                }, 1000)  
                setTimeout(function() {
                    resolve(cooker.work(newFoot));
                    clearInterval(timers)
                }, newFoot.cookTime*1000)                
                
            })
            .then(function(dish) {
                waiter.work(dish);
                setTimeout(function() {
                    oWaiter.style.top = 250 + "px";
                    oWaiter.style.left = 200 + "px"; 
                }, 500)
                sleep(500);
                newCustomer.eat(dish);
                cuLi[0].innerHTML = ""
                var newLi = document.createElement("li");
                newLi.innerHTML = "开始吃：" + dish + ",剩余<span>6s吃完！</span>"
                customerState.appendChild(newLi)
                let eatTime = 6;

                newLi.timers = setInterval(function() {
                    eatTime--;
                    if (eatTime == 0) {
                        clearInterval(newLi.timers)
                        newLi.innerHTML = dish + ": 吃完了！";                                                
                    } else {
                        newLi.innerHTML = "开始吃：" + dish + ",剩余<span>" + eatTime + "s吃完！</span>";
                    }
                }, 1000)

                if(n < foots.length) {
                    cookEvery(foots);
                    setTimeout(function() {
                        oWaiter.style.top = 0 + "px";
                        oWaiter.style.left = 0 + "px";  
                    }, 500)
                    
                } else {
                    cookerState.innerHTML = "空闲中。。。。。。";
                    setTimeout(function() {
                        customerState.innerHTML = "付钱滚蛋！";
                        setTimeout(function() {
                            customerState.innerHTML = ""; 
                            var money = newCustomer.pay(foots);
                            restaurant.cash += money;
                            oCash.innerHTML = restaurant.cash;
                            
                                
                            setTimeout(function() {
                                oWaiter.style.top = 30 + "px";
                                oWaiter.style.left = 350 + "px";
                            }, 500)
                            oRestaurant.removeChild(oCustomer[0]);
                                 
                             
                            setTimeout(run, 2000)      
                        }, 500)
                    }, 7000)                                      
                }                
            })
        }        
    })
}

