//餐厅类
function Restaurant(object) {
    this.cash = object.cash;
    this.seats = object.seats;
    this.staff = object.staff;
}
Restaurant.prototype = {
    constructor: Restaurant,
    hire: function (value) {
        this.staff.push(value);
    },
    fire: function (value) {
        let index = this.staff.indexOf(value);
        this.staff.splice(index, 1);
    }
}
//菜单
function Menu(name, costing, price, time) {
    this.name = name;
    this.costing = costing;
    this.price = price;
    this.time = time
}
Menu.prototype = {
    constructor: Menu,
}