function Staff(name, wage) {
    // this.id = id;
    this.name = name;
    this.wage = wage;
}
Staff.prototype.work = function(job) {
        console.log(this.name + '完成一次工作：' + job);
    }
    //服务员类
function Waiter(name, wage) {

    Staff.call(this, name, wage);
    this.instance = null;
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constuctor = Waiter;
Waiter.prototype.work = function(obj) {
    if (Array.isArray(obj)) {
        console.log('服务员' + this.name + "记录客人点菜");
    } else {
        console.log('服务员' + this.name + "上菜：" + obj.food.name);
    }
    return obj;
}
Waiter.getInstance = function(name, wage) {
        if (!this.instance) {
            this.instance = new Waiter(name, wage);
        }
        return this.instance;
    }
    //厨师类
function Cook(name, wage) {
    Staff.call(this, name, wage);
    this.instance = null;
}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constuctor = Cook;
Cook.prototype.work = function(foodList) {
	createCookList(foodList);
    var food = foodList[0];
    var time = food.time;
    var obj = {
        food: food,
        foodList: foodList
    }
    return new Promise(function(resolve, reject) {
        var cookInterval = setInterval(() => {
            if (time == 0) {
				clearInterval(cookInterval);
				showCookStatus(food.name + "烧完了!"); 
                console.log(food.name + "烧完了!");
                
                resolve(obj);
            } else {
				var content='厨师' + this.name + '正在烧' + food.name + '(还剩' + time + 's)...'
				showCookStatus(content)
                console.log(content);
                time--;
            }
        }, timeUnit);
    })
}
Cook.getInstance = function(name, wage) {
    if (!this.instance) {
        this.instance = new Cook(name, wage);
    }
    return this.instance;
}