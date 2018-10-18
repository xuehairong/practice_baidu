function FootballField(width, length) {
    this.width = m2px(width),
        this.length = m2px(length)
}
//参数：速度，直径，根据球场的缩放比例
function Footballer(id, VNum, r, bl) {
    this.id = id;
    this.VNum = VNum;
    this.r = m2px(r);
    if (bl > 1) { bl = 1; }
    this.bl = bl;
    var chart = document.createElement("canvas");
    chart.id = this.id;
    chart.style.position = "absolute";
    // chart.style.left = '19px';
    // chart.style.top = '19px';

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

// Footballer.prototype.GetDom = function() {

//     return chart;
// }
Footballer.prototype.Run = function(x, y) {
    this.dom.style.left = (m2px(x) * this.bl) + 'px';
    this.dom.style.top = (m2px(y) * this.bl) + 'px';
}
Footballer.prototype.Init = function(x, y) {
        console.log(this.dom);
        console.log(m2px(x) * this.bl);
        console.log(m2px(y) * this.bl);
        this.dom.style.left = (m2px(x) * this.bl) + 'px';
        this.dom.style.top = (m2px(y) * this.bl) + 'px';
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