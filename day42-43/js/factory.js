//定义一个静态方法来实现接口与实现类的直接检验
//静态方法不要写出Interface.prototype ,因为这是写到接口的原型链上的
//我们要把静态的函数直接写到类层次上
//(1)定义一个接口类
var Interface = function(name, methods) { //name：接口名字
    if (arguments.length < 2) {
        alert("必须是两个参数")
    }
    this.name = name;
    this.methods = []; //定义一个空数组装载函数名
    for (var i = 0; i < methods.length; i++) {
        if (typeof methods[i] != "string") {
            alert("函数名必须是字符串类型");
        } else {
            this.methods.push(methods[i]);
        }
    }
};
Interface.ensureImplement = function(object) {
        if (arguments.length < 2) {
            throw new Error("参数必须不少于2个")
            return false;
        }
        for (var i = 1; i < arguments.length; i++) {
            var inter = arguments[i];
            //如果是接口就必须是Interface类型
            if (inter.constructor != Interface) {
                throw new Error("如果是接口类的话，就必须是Interface类型");
            }
            //判断接口中的方法是否全部实现
            //遍历函数集合
            for (var j = 0; j < inter.methods.length; j++) {
                var method = inter.methods[j]; //接口中所有函数

                //object[method]传入的函数
                //最终是判断传入的函数是否与接口中所用函数匹配
                if (!object[method] || typeof object[method] != "function") { //实现类中必须有方法名字与接口中所用方法名相同
                    throw new Error("实现类中没有完全实现接口中的所有方法")
                }
            }
        }
    }
    /*创建extend函数为了程序中所有的继承操作*/
    //subClass:子类  superClass：超类
function extend(subClass, superClass) {
    //1，使子类原型属性等于父类的原型属性

    //初始化一个中间空对象，目的是为了转换主父关系
    var F = function() {};
    F.prototype = superClass.prototype;
    //2， 让子类继承F
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    //3，为子类增加属性 superClass ==》原型链的引用
    subClass.superClass = superClass.prototype;
    //4，增加一个保险，就算你的原型类是超类（Object）那么也要把你的构造函数级别降下来
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}