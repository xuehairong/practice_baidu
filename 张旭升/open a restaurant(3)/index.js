//初始化实例
let menu = interface.createMenu();
let customer = interface.createCustomer();
let restaurant = interface.restaurant;
let waiter = interface.waiter;
let cook = interface.cook;

let cus = customer[0];

let menuArray = [];
let cusExist = true;

function main() {

    restaurant.hire(waiter);
    restaurant.hire(cook);

    menuArray = cus.order(menu);
    let object = {
        name: cus.name,
        menuArray: menuArray
    }
    let promise = Promise.resolve(object);
    for (let i = 0; i < menuArray.length; i++) {
        if (!cusExist) {
            promise = promise
                .then(waiter.moveCook)
                .then(cook.finishWork)
                .then(waiter.finishWork)
                .then(cus.eat);
        } else {
            promise = promise
                .then(waiter.moveCus)
                .then(cus.seat)
                .then(waiter.finishWork)
                .then(cook.finishWork)
                .then(waiter.finishWork)
                .then(cus.eat)

            cusExist = false;
        }
    }
}

main();

// function test(array) {
//     let time = array[0];
//     return new Promise(function(resolve, reject) {
//         let timer = setInterval(function() {
//             if (time === 0) {
//                 //   console.log('吃完了！');
//                 clearInterval(timer);
//                 array.shift();
//                 resolve(array);
//             } else {
//                 console.log('还剩下：' + time + '秒 吃完');
//                 time--;
//             }
//         }, 1000);
//         // setTimeout(() => {
//         //     console.log(time+'begin');
//         //     resolve(time+'ok');
//         // }, time);

//     });
// }
// //let promise = test([3,5,7]);
// test([3, 5, 7]).then(
//     function(foodList) {
//         console.log(foodList);
//         console.log('吃完了！')
//     }
// );
// //   .then(test([5, 7]))

// function queue2(array) {
//     // let object = {
//     //     array: array
//     // }
//     let promise = test(array);
//     for (let i = 1; i < array.length; i++) {
//         promise = promise
//             .then(function(result) {
//                 console.log(result);
//                 test(result);
//             });
//     }
// }