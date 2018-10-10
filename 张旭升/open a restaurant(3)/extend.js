//继承
function extend(Child, Parent) {
    let F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

// function timer(time, menu) {
//     setInterval(function () {
//         if (time === 0) {
//             clearInterval(timer);
            
//         } else {
//             console.log('还剩下：' + time + '秒 做完' + menu.name);
//             time--;
//         }
//     }, 1000);
// }