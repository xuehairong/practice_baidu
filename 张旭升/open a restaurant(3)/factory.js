//建立静态工厂，这里使用了简单工厂，本来想使用复杂工厂的。但是就一个大类，所以就用了简单工厂
let Factory = {
    getInstance: function (object) {
        let clerk,
            kind = object.kind || '',
            id = object.id || 0,
            name = object.name || '',
            salary = object.salary || 0,
            costing = object.costing || 0,
            price = object.price || 0,
            time = object.time || 0;

        switch (kind) {
            case 'waiter':
                clerk = singletonWaiter.getInstance(id, name, salary);
                break;
            case 'cook':
                clerk = singletonCook.getInstance(id, name, salary);
                break;
            case 'customer':
                clerk = new Customer(name);
                break;
            case 'menu':
                clerk = new Menu(name, costing, price, time);
                break;
            case 'restaurant':
                clerk = new Restaurant(object);
                break;
            default:
                break;
        }
        return clerk;
    }
}
//实例
function Instance() {};
Instance.prototype = {
    constructor: Instance,
    createInstance: function (object) {
        let clerk = Factory.getInstance(object);
        return clerk;
    }
}
let interface = (function () {
    let newInstance = new Instance();
    return {
        //饭店
        restaurant: newInstance.createInstance({
            kind: 'restaurant',
            cash: 1000000,
            seats: 20,
            staff: []
        }),
        //服务员
        waiter: newInstance.createInstance({
            kind: 'waiter',
            id: 1,
            name: '小张',
            salary: 3000
        }),
        //厨师
        cook: newInstance.createInstance({
            kind: 'cook',
            id: 1,
            name: '张厨师',
            salary: 5000
        }),
        //顾客
        createCustomer: function () {
            let array = ['Tom', 'Tony', 'Robin'];
            let customerArray = [];
            for (let i = 0; i < array.length; i++) {
                let customer = newInstance.createInstance({
                    kind: 'customer',
                    name: array[i]
                });
                customerArray.push(customer);
            }
            return customerArray;
        },
        //菜单实例
        createMenu: function () {
            let menuArray = [];
            let menu = [{
                    name: '红烧肉',
                    costing: 20,
                    price: 35,
                    time: 4000
                },
                {
                    name: '小酥肉',
                    costing: 25,
                    price: 40,
                    time: 5000
                },
                {
                    name: '土豆肉片',
                    costing: 7,
                    price: 10,
                    time: 4000
                },
                {
                    name: '蒸熊掌',
                    costing: 40,
                    price: 60,
                    time: 7000
                }
            ];
            for (let i = 0; i < menu.length; i++) {
                let object = newInstance.createInstance({
                    kind: 'menu',
                    name: menu[i].name,
                    costing: menu[i].costing,
                    price: menu[i].price,
                    time: menu[i].time
                });
                menuArray.push(object);
            }
            return menuArray;
        }
    }
})();