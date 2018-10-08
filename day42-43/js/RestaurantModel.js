(function() {
    //(2)接口调用
    var Pet = new Interface("Pet", ["eat", "run", "sing", "register"]);

    //（3）基类  分析后有共同的提出来作为基类
    function basePet() {
        this.register = function() {
            document.write("宠物登记。。。。<br>");
        }
        this.eat = function() {
            document.write("宠物吃饭。。。。<br>");
        }
    }
    //（4）实现类  继承基类+接口实现
    function Dog() {
        Dog.superClass.constructor.call(this); //继承父类
        //实现接口
        this.run = function() {
            document.write("小狗跑......<br>")
        }
        this.sing = function() {
            document.write("小狗唱歌......<br>")
        }
    }

    function Cat() {
        Cat.superClass.constructor.call(this); //继承父类
        //实现接口
        this.run = function() {
            document.write("小猫跑......<br>")
        }
        this.sing = function() {
            document.write("小猫唱歌......<br>")
        }
    }

    function Pig() {
        Pig.superClass.constructor.call(this); //继承父类
        //实现接口
        this.run = function() {
            document.write("小猪跑......<br>")
        }
        this.sing = function() {
            document.write("小猪唱歌......<br>")
        }
    }

    function Bird() {
        Bird.superClass.constructor.call(this); //继承父类
        //实现接口
        this.run = function() {
            document.write("小鸟跑......<br>")
        }
        this.sing = function() {
            document.write("小鸟唱歌......<br>")
        }
    }
    //继承
    extend(Dog, basePet);
    extend(Cat, basePet);
    extend(Pig, basePet);
    extend(Bird, basePet);


    //（1）使用工厂方式创建宠物对象
    // 静态工厂
    var factoryPet = {
            //出售宠物的方法
            getPet: function(kind) {
                //宠物对象
                var pet;
                //宠物种类
                switch (kind) {
                    case 'dog':
                        pet = new Dog();
                        break;
                    case 'cat':
                        pet = new Cat();
                        break;
                    case 'pig':
                        pet = new Pig();
                        break;
                    default:
                        pet = new Bird();
                }
                //验证接口
                Interface.ensureImplement(pet, Pet); //判断pet对象是否全部实行接口Pet里面全部的方法
                return pet;
            }
        }
        //（5）利用工厂的宠物店对象（宠物店买宠物）
    var factoryPetShop = function() {}
    factoryPetShop.prototype = {
            getPet: function(kind) {
                var pet = factoryPet.getPet(kind);
                pet.eat();
                pet.register();
                return pet;
            }
        }
        //（6）从宠物店购买宠物
    var newPetShop = new factoryPetShop(); //宠物工厂
    var flowerCat = newPetShop.getPet("cat"); //从宠物工厂中得到宠物
    flowerCat.sing();

})()