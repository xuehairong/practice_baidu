function CreateLineChart(data) {
    var areaHeight = 310;
    var areaWidth = 600;
    var axisHeight = 300;
    var axisWidth = 800;
    var pointDiameter = 10;
    var pointColor = "yellow";
    var lineColor = "green";
    var lineWidth = 2;
    var pointMargin = 50;

    var maxSale = data[0];
    for (i in data) {
        if (maxSale < data[i]) {
            maxSale = data[i];
        }
    }
    var proportion = maxSale / axisHeight;
    // console.log(proportion);
    //绘制图画区域
    var lineChart = document.createElement('canvas');
    lineChart.width = areaWidth;
    lineChart.height = areaHeight;
    var canvasWrap = document.getElementById('canvas-wrapper');
    canvasWrap.appendChild(lineChart);
    if (lineChart.getContext) {
        var ctx = lineChart.getContext('2d');
        // drawing code here
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.lineTo(40, axisHeight);
        ctx.lineTo(axisWidth + 40, axisHeight);
        ctx.stroke();
        var x = 40; // x 坐标值
        for (i in data) {
            ctx.beginPath();
            x += pointMargin;
            var y = axisHeight - data[i] * proportion; // y 坐标值
            // console.log(y);
            var radius = pointDiameter / 2; // 圆弧半径
            var startAngle = 0; // 开始点
            var endAngle = Math.PI * 2; // 结束点
            var anticlockwise = true; // 顺时针或逆时针
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.fillStyle = pointColor;
            ctx.fill();
            if (i != 0) {
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
            var lastX = x;
            var lastY = y;

        }
    }
}