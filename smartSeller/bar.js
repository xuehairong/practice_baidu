let data = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}]

function CreateBarChart() {
    console.log('CreateBarChart()');
    var areaWidth = 1000;
    var areaHeight = 500;
    var axisWidth = 800;
    var axisHeight = 300;
    var barWidth = 20;
    var barMargin = 20;
    var barColor = "red";
    var axisColor = "black";
    // var copySale = data[0].sale;
    // copySale.sort((a, b) => b - a);
    var maxSale = data[0].sale[0];
    for (i in data[0].sale) {
        if (maxSale < data[0].sale[i]) {
            maxSale = data[0].sale[i];
        }
    }
    var proportion = maxSale / axisHeight;
    //绘制图画区域
    var nameSpace = 'http://www.w3.org/2000/svg';
    var barChart = document.createElementNS(nameSpace, 'svg');
    barChart.setAttribute('width', areaWidth);
    barChart.setAttribute('height', areaHeight);
    var svgWrap = document.getElementById('svg-wrapper');
    svgWrap.appendChild(barChart);
    // 绘制横轴及纵轴
    let zeroPoint = "M 40 " + axisHeight;
    var xAxis = document.createElementNS(nameSpace, 'path');
    xAxis.setAttribute('d', zeroPoint + " h " + axisWidth);
    xAxis.setAttribute('stroke', axisColor);
    barChart.appendChild(xAxis);
    var yAxis = document.createElementNS(nameSpace, 'path');
    yAxis.setAttribute('d', zeroPoint + " v " + -axisHeight);
    yAxis.setAttribute('stroke', axisColor);
    barChart.appendChild(yAxis);
    //绘制柱形  
    var beginPosition = 40 + barMargin;
    console.log(beginPosition);
    for (i in data[0].sale) {
        var bar = document.createElementNS(nameSpace, 'rect');
        bar.setAttribute('x', beginPosition);
        bar.setAttribute('y', axisHeight - data[0].sale[i] * proportion);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', data[0].sale[i] * proportion);
        bar.style.fill = barColor;
        console.log(bar);
        barChart.appendChild(bar);
        beginPosition += barMargin + barWidth;
    }
}