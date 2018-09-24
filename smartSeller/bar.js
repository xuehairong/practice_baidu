function CreateBarChart(data) {
    // console.log('CreateBarChart()');
    var areaWidth = 800;
    var areaHeight = 310;
    var axisWidth = 600;
    var axisHeight = 300;
    var barWidth = 20;
    var barMargin = 20;
    var barColor = "red";
    var axisColor = "black";
    // var copySale = data;
    // copySale.sort((a, b) => b - a);
    var maxSale = data[0];
    for (i in data) {
        if (maxSale < data[i]) {
            maxSale = data[i];
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
    // console.log(beginPosition);
    for (i in data) {
        var bar = document.createElementNS(nameSpace, 'rect');
        bar.setAttribute('x', beginPosition);
        bar.setAttribute('y', axisHeight - data[i] * proportion);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', data[i] * proportion);
        bar.style.fill = barColor;
        // console.log(bar);
        barChart.appendChild(bar);
        beginPosition += barMargin + barWidth;
    }
}