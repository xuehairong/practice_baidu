//世界杯决赛阶段：长度105米（约115码），宽度68米（约74码）
var footballField = new FootballField(0.6, 1)

function CreateCanvas() {
    var wrapper = document.getElementById('footballFieldWrapper')
    var chart = document.createElement("canvas");
    // chart.width = 800;
    // chart.height = 450;
    chart.width = footballField.length;
    chart.height = footballField.width;
    var realBL = footballField.width / footballField.length; //实际球场的宽高比
    if (chart.width > wrapper.clientWidth) //如果宽度大于容器的宽度
    {
        chart.width = wrapper.clientWidth;
        chart.height = chart.width * realBL;
    }
    if (chart.height > wrapper.clientHeight) { //如果高度大于容器的高度
        chart.height = wrapper.clientHeight;
        chart.width = chart.height * realBL;
    }
    // var rectWidth = footballField.length * chartBL; //计算出矩形的宽度
    // var rectHeight = rectWidth * realBL; //计算出矩形的长度
    var footballFieldWrapper = document.getElementById('footballFieldWrapper');
    footballFieldWrapper.appendChild(chart);
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
}

console.log("dpi:" + getDPI());
CreateCanvas();