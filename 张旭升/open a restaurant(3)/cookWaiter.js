//职员
function Clerk(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}
Clerk.prototype.finish = function () {
    console.log('完成工作了！');
}
//服务单例模式
let singletonWaiter = (function () {
    let instance = null;
    //条件，判断是否为第一个数
    
    let waiteSpan = document.getElementById('waiter-speak');
    let waiterDom = document.getElementsByClassName('waiter')[0];
    //服务类
    function Waiter(id, name, salary) {
        Clerk.apply(this, arguments); //继承属性

    }
    //继承方法
    extend(Waiter, Clerk);
    //如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
    //不是数组，传递过来的是对象
    Waiter.prototype.finishWork = function (menuArray) {
        let string = '';
        return new Promise(function (resolve, reject) {
            if (Array.isArray(menuArray)) {

                for (let i = 0; i < menuArray.length; i++) {
                    string += '丶' + menuArray[i].name;
                }
                console.log('客人点了：' + string);
                waiterDom.className = 'waiter  waiter-animation-cook';
                waiteSpan.innerHTML = '客人点了' + string;
                CusTrue = true;

                setTimeout(function () {
                    resolve(menuArray);
                }, 500);
            } else {
                let ArrayMenu = menuArray.menuArray;
                menu = menuArray.menu;
                waiterDom.className = 'waiter  waiter-animation-cus';
                waiteSpan.innerHTML = '您要的' + menu.name + '好了，您慢用！';
                resolve(ArrayMenu);
            }
        });
    }
    Waiter.prototype.moveCook = function (menuArray) {
        setTimeout(function () {
            waiterDom.className = 'waiter  waiter-animation-cook';
            waiteSpan.innerHTML = '等待！';
        }, 1000);
        return menuArray;
    }
    Waiter.prototype.moveCus = function (object) {
        let menuArray = object.menuArray;
        let name = object.name;
        waiteSpan.innerHTML = '顾客' + name + '来了';
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                waiterDom.className = 'waiter  waiter-animation-cus';
                waiteSpan.innerHTML = '我们这有小酥肉、土豆肉片、红烧肉、蒸熊掌';
                CusMove = true;
                resolve(menuArray);
            }, 1000);


        });
    }
    // Waiter.prototype.moveCook = function () {

    // }

    return {
        getInstance: function (id, name, salary) {
            if (instance === null) {
                instance = new Waiter(id, name, salary);
            }
            return instance;
        }
    }
})();


//厨师单例模式
let singletonCook = (function () {
    let instance = null;
    let cookSpan = document.getElementById('cook-speak');
    let cookTime = document.getElementById('cook-time');
    let cookFinish = []
    let isTrue = true;
    let num = 0;

    function Cook(id, name, salary) {
        Clerk.apply(this, arguments); //继承属性

    }
    extend(Cook, Clerk);
    //厨师做饭的方法
    Cook.prototype.finishWork = function (array) {
        if (isTrue) {
            let text = '';
            for (let i = 0; i < array.length; i++) {
                text += '<li class =cookLi>' + array[i].name +
                    '<span class = cookFinish></span></li>';
            }
            cookSpan.innerHTML = text;
            isTrue = false;

        }
        let menu = array[0];
        let object = {
            menu: array[0],
            menuArray: menuArray
        }
        let cookFinishLegth = document.getElementsByClassName('cookFinish');
        let cookFinish = cookFinishLegth[num];
        num++; //计数器
        let time = menu.time / 1000;
        return new Promise(function (resolve, reject) {
            let timer = setInterval(function () {
                if (time === 0) {
                    clearInterval(timer);
                    cookFinish.innerHTML = '完成！';
                    cookTime.innerHTML = '完成了' + menu.name;
                    resolve(object);
                } else {
                    cookTime.innerHTML = '还剩下：' + time + '秒 做完' + menu.name
                    time--;
                }
            }, 1000);
        });
    }
    return {
        getInstance: function (id, name, salary) {
            if (instance === null) {
                instance = new Cook(id, name, salary);
            }
            return instance;
        }
    }
})();
//判断数组的方法
function isArrayOne(arr) {
    return '<span style = "color:#cc0000;" > Object.prototype.toString.call(arr) === "[object Array]"; < /span>';
}