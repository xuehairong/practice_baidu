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
Waiter.prototype.work = function(job) {
    var jobContent = "上菜行为";
    if (Array.isArray(job)) {
        jobContent = "记录客人点菜";
    }
    console.log('服务员' + this.name + jobContent);
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
Cook.prototype.work = function(food) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('厨师' + this.name + '正在烧' + food.name + '(' + food.time + 's)...');
            return (resolve(food));
        }, food.time * timeUnit);
    })

}
Cook.getInstance = function(name, wage) {
    if (!this.instance) {
        this.instance = new Cook(name, wage);
    }
    return this.instance;
}

// (function() {
//     //(2)接口调用
//     var Staff = new Interface("Staff", ["work"]);

//     //（3）基类  分析后有共同的提出来作为基类
//     function baseEmployee(name, wage) {
//         this.name = name;
//         this.wage = wage;
//     }
//     //（4）实现类  继承基类+接口实现
//     function Waiter() {
//         Waiter.superClass.constructor.call(this); //继承父类
//         //实现接口
//         this.work = function(job) {
//             var jobContent = "上菜行为";
//             if (Array.isArray(job)) {
//                 jobContent = "记录客人点菜";
//             }
//             console.log('服务员' + this.name + jobContent);
//         }
//     }

//     //继承
//     extend(Waiter, baseEmployee);


//     //（1）使用工厂方式创建宠物对象
//     // 静态工厂
//     var factoryPet = {
//             //出售宠物的方法
//             getPet: function(kind) {
//                 //宠物对象
//                 var pet;
//                 //宠物种类
//                 switch (kind) {
//                     case 'dog':
//                         pet = new Dog();
//                         break;
//                     case 'cat':
//                         pet = new Cat();
//                         break;
//                     case 'pig':
//                         pet = new Pig();
//                         break;
//                     default:
//                         pet = new Bird();
//                 }
//                 //验证接口
//                 Interface.ensureImplement(pet, Pet); //判断pet对象是否全部实行接口Pet里面全部的方法
//                 return pet;
//             }
//         }
//         //（5）利用工厂的宠物店对象（宠物店买宠物）
//     var factoryPetShop = function() {}
//     factoryPetShop.prototype = {
//             getPet: function(kind) {
//                 var pet = factoryPet.getPet(kind);
//                 pet.eat();
//                 pet.register();
//                 return pet;
//             }
//         }
//         //（6）从宠物店购买宠物
//     var newPetShop = new factoryPetShop(); //宠物工厂
//     var flowerCat = newPetShop.getPet("cat"); //从宠物工厂中得到宠物
//     flowerCat.sing();

// })()