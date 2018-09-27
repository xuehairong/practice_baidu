// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// x 和 y 坐标 —— 小球在屏幕上最开始时候的坐标。坐标的范围从 0 （左上角）到浏览器视窗的宽和高（右下角）。
// 水平和竖直速度（velX 和 velY）— 我们会给每个小球一个水平和竖直速度。实际上，当我们让这些球开始运动时候，每过一帧都会给小球的 x 和 y 坐标加一次这些值。
// color —— 每一个小球会有自己的颜色。
// size —— 每一个小球会有自己的大小 — 也就是小球的半径，以像素为单位。

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
Ball.prototype.update = function() {
        //检查小球的x坐标是否大于画布的宽度（小球会从右边缘离开）。
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        //检查小球的x坐标是否小于0（小球会从左边缘离开）。
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        // 检查小球的y坐标是否大于画布的高度（小球会从下边缘离开）。
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        // 检查小球的y坐标是否小于0（小球会从上边缘离开）。
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    // 撞击侦察，从而小球会知道他们正在撞击
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        // 不是自己撞自己
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            // 两个小球中心的距离是否小于两个小球的半径之和。代表相撞了
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}
var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
var balls = [];

function loop() {
    // 将整个画布的颜色设置成半透明的黑色。
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    // 画出一个填充满整个画布的矩形。这是在下一个视图画出来时用来遮住之前的视图的。
    // 如果不这样做得话，你就会在屏幕上看到一条蛇的形状而不是小球的运动了。
    // 用来填充的颜色设置成半透明的rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，
    // 从而你可以看到小球运动时的尾巴。如果你将 0.25 设置成 1 时，你就完全看不到了。
    // 试着改变其中的值查看造成的影响。
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 20)
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}