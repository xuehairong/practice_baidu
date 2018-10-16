function FootballField(width, length) {
    this.width = m2px(width),
        this.length = m2px(length)
}

function Footballer(VNum, r) {
    this.VNum = VNum;
    this.r = m2px(r);
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