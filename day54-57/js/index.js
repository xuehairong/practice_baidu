//世界杯决赛阶段：长度105米（约115码），宽度68米（约74码）
var footballField = new FootballField(450, 800) //足球场比例为16:9

function CreateCanvas() {
    var chart = document.createElement("canvas");
    chart.width = footballField.length;
    chart.height = footballField.width;
    var footballFieldWrapper = document.getElementById('footballFieldWrapper');
    footballFieldWrapper.appendChild(chart);
    if (chart.getContext) {
        var ctx = chart.getContext('2d');
        ctx.rect(0, 0, chart.width, chart.height);
        ctx.fillStyle = "#008001";
        ctx.fill();
        ctx.rect(40, 20, chart.width - 80, chart.height - 40);
        ctx.strokeStyle = "#FFF";
        ctx.stroke();

    }
}
CreateCanvas();