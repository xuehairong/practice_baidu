function FootballField(width, length, wrapperWidth, wrapperHeight) {
    this.width = m2px(width);
    this.length = m2px(length);

    var chart = document.createElement("canvas");
    chart.width = this.length;
    chart.height = this.length;
    var realBL = this.length / this.length; //实际球场的宽高比
    if (chart.width > wrapperWidth) //如果宽度大于容器的宽度
    {
        chart.width = wrapperWidth;
        chart.height = chart.width * realBL;
    }
    if (chart.height > wrapperHeight) { //如果高度大于容器的高度
        chart.height = wrapperHeight;
        chart.width = chart.height * realBL;
    }
    var bl = chart.width / this.length; //球场的缩放比例
    this.bl = bl;
    // var rectWidth = this.length * chartBL; //计算出矩形的宽度
    // var rectHeight = rectWidth * realBL; //计算出矩形的长度

    if (chart.getContext) {
        var marginX = 40;
        var marginY = 20;
        var bigDoorWidth = 120;
        var bigDoorHeight = 240;
        var r = 80; //中间球的半径
        var ctx = chart.getContext('2d');
        //ctx.beginPath();
        //填充绿地
        ctx.rect(0, 0, chart.width, chart.height);
        ctx.fillStyle = "#008001";
        ctx.fill();
        //最外面的白线框
        ctx.rect(marginX, marginY, chart.width - marginX * 2, chart.height - marginY * 2);
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        //画中线
        ctx.beginPath();
        ctx.moveTo(chart.width / 2, marginY);
        ctx.lineTo(chart.width / 2, chart.height - marginY)
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        //画中间的圆
        ctx.beginPath();
        ctx.arc(chart.width / 2, chart.height / 2, r, 0, 2 * Math.PI);
        ctx.stroke();
        //画左边大球门
        ctx.beginPath();
        ctx.moveTo(marginX, chart.height / 2 - bigDoorHeight / 2);
        ctx.lineTo(marginX + bigDoorWidth, chart.height / 2 - bigDoorHeight / 2);
        ctx.lineTo(marginX + bigDoorWidth, chart.height / 2 + bigDoorHeight / 2);
        ctx.lineTo(marginX, chart.height / 2 + bigDoorHeight / 2);
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
    }
    this.dom = chart;
}
//参数：速度，直径，根据球场的缩放比例,爆发力，体力
function Footballer(VNum, r, bl, EPNum, PPNum) {
    this.VNum = VNum; //速度值100~1之间的整数随机数
    this.EPNum = EPNum;
    this.PPNum = PPNum;
    this.r = m2px(r);
    if (bl > 1) { bl = 1; }
    //最高速度(米/秒)
    this.VMax = m2px(3 + (VNum - 1) * (9 / 98)) * bl;
    this.bl = bl;
    var chart = document.createElement("canvas");
    chart.id = this.id;
    chart.style.position = "absolute";
    chart.width = this.r * this.bl;
    chart.height = this.r * this.bl;


    if (chart.getContext) {
        var ctx = chart.getContext('2d');
        ctx.beginPath();
        ctx.arc(chart.width / 2, chart.width / 2, chart.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    chart.onclick = function() {
        chart.style.left = "800px";
        chart.style.top = "400px";
    }
    this.dom = chart;
}

Footballer.prototype.Run = function(x, y) {
    let pxx = m2px(x) * this.bl;
    let pxy = m2px(y) * this.bl;
    //计算出距离
    var dis = getDistance(this.initX, this.initY, pxx, pxy);
    console.log(dis);
    console.log(this.VMax);
    //距离除以速度计算出所需时间
    var time = dis / this.VMax;
    // -webkit-transition: all 6s cubic-bezier(0.47, 0, 0.745, 0.715);
    // transition: all 6s cubic-bezier(0.47, 0, 0.745, 0.715);
    this.dom.style.cssText += "transition: all " + time + "s cubic-bezier(0.47, 0, 0.745, 0.715);"
    this.dom.style.left = pxx + 'px';
    this.dom.style.top = pxy + 'px';
}
Footballer.prototype.Init = function(x, y) {
        var pxx = m2px(x) * this.bl;
        var pxy = m2px(y) * this.bl;
        this.initX = pxx;
        this.initY = pxy;
        this.dom.style.left = pxx + 'px';
        this.dom.style.top = pxy + 'px';
    }
    //根据米算DPI
function m2px(m) {
    var dpi = getDPI();
    var pixel = parseFloat(m) / 25.4 * dpi[0] * 1000; //只计算x轴的dPI
    return (parseInt(pixel))
}

function getDPI() {
    var arrDPI = new Array();
    if (window.screen.deviceXDPI != undefined) { //ie 9
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    } else { //chrome firefox
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
    }
    return arrDPI;
}

function getDistance(x1, y1, x2, y2) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return parseInt(dis);
}