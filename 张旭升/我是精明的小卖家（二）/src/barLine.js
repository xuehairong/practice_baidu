import {sourceData} from './data.js';
// import {data} from './getTableData.js';

let barLine = {
    getMax: function () {
        //坑货js的sort排序,自己需要重写
        let data = [];
        for (let i = 0; i < sourceData.length; i++) {
            let sortData = [].concat(sourceData[i].sale);
            let max = sortData.sort(this.sortNum);
            max = max[sortData.length - 1];
            data.push(max);
        }
        let max = data.sort()[data.length - 1];
        return max;
    },
    //绘制xy坐标与相关参数
    drawXY: function () {
        let c = document.getElementById("canvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 600, 330);
        //最大值与比例
        let max = this.getMax();
        let ratio = 300 / max;
        //纵横初始坐标位置
        let startX = 20;
        let endX = 525;
        let startY = 0;
        let endY = 300;

        let y = 1;
        let lineX = 25;
        let num = 0;

        ctx.beginPath();
        ctx.moveTo(startX, endY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.moveTo(startX + 5, startY);
        ctx.lineTo(startX + 5, endY + 5);
        ctx.stroke();

        for (let i = 0; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(525, y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            ctx.fillStyle = '#277DF4';
            ctx.fillText(720 - num, 0, y + 10);
            if (i === 0) {
                y = 0;
            }
            y += 50; //坐标
            num += 120; //参照物数字
        }
        ctx.fillText('0', 0, 305);
        //创建下标与月份
        for (let i = 0; i < 12; i++) {
            //折线的月份
            let month = (i + 1) + '月';
            ctx.fillStyle = '#277DF4';
            //文字
            ctx.fillText(month, (lineX - 5), (endY + 15));
            if (i !== 0) {
                ctx.beginPath();
                ctx.moveTo(lineX, endY);
                ctx.lineTo(lineX, (endY + 5));
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            lineX += 45;
        }
    },
    drawLine: function (data) {
        let c = document.getElementById("canvas");
        let ctx = c.getContext("2d");
        this.drawXY();
        let max = this.getMax();
        let ratio = 300 / max;

        let lineX = 25;
        for (let i = 0; i < data.length; i++) {
            //圆点
            ctx.beginPath();
            ctx.arc(lineX, ((max - data[i]) * ratio), 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#277DF4';
            ctx.fill();
            if (i !== 0) {
                //绘制连线
                ctx.beginPath();
                ctx.moveTo((lineX - 45), parseInt((max - data[i - 1]) * ratio));
                ctx.lineTo(lineX, parseInt((max - data[i]) * ratio));
                ctx.strokeStyle = '#277DF4';
                ctx.stroke();
            }
            lineX += 45;
        }
    },
    drawManyLines: function () {
        let c = document.getElementById("canvas");
        let ctx = c.getContext("2d");
        let color = ['#AAAAAA', '#FF44AA', '#FF3333', '#FF7744', '#FFCC22', '#FFFF33', '#CCFF33', '#33FF33', '#33FFAA', '#33CCFF', '#9955FF'];
        this.drawXY();
        let max = this.getMax();
        let ratio = 300 / max;
        //获取数据
        let data = [];
        for (let i = 0; i < sourceData.length; i++) {
            data[i] = sourceData[i].sale;
        }
        //进行数据绘制
        for (let i = 0; i < data.length; i++) {
            let lineX = 25;
            let lineColor = color[i];
            for (let j = 0; j < data[i].length; j++) {
                //圆点
                ctx.beginPath();
                ctx.arc(lineX, parseInt((max - data[i][j]) * ratio), 2.5, 0, 2 * Math.PI);
                ctx.fillStyle = lineColor;
                ctx.fill();
                if (j !== 0) {
                    //绘制连线
                    ctx.beginPath();
                    ctx.moveTo((lineX - 45), parseInt((max - data[i][j - 1]) * ratio));
                    ctx.lineTo(lineX, parseInt((max - data[i][j]) * ratio));
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                }
                lineX += 45;
            }
        }
    },
    drawBar: function (data) {
        let svgContent = document.getElementById('svgContent');
        
        let text = '';
        let max = this.getMax();
        //比例约束
        let ratio = 300 / max;
        let barX = 40;
        //横纵坐标
        text += '<line x1="25"  x2="525" y1="' + 300 + '" y2="' + 300 +
            '" stroke="black" stroke-width="1" />';
        text += '<line x1="30"  x2="30" y1="0 " y2="' + (300 + 5) +
            '" stroke="black" stroke-width="1" />';
        //柱状图参照物

        let y = 1;
        let num = 0;
        for (let i = 0; i <= 5; i++) {
            text += '<line x1="25" x2="525" y1=' + y + ' y2=' + y + ' stroke="gray"' +
                'stroke-opacity="1" stroke-width="1"/>';
            text += '<text font-size="11" x=0 y=' + (y + 10) + ' y=320>' + (720 - num) + '</text>';
            if (i === 0) {
                y = 0;
            }
            y += 50; //坐标
            num += 120; //参照物数字
        }
        //数字为0
        text += '<text  font-size="11" x=0 y=' + 305 + ' y=320>' + 0 + '</text>';
        //绘制月份
        for (let i = 0; i < 12; i++) {
            let month = (i + 1) + '月';
            //柱状图的文字
            text += '<text fill="#277DF4" font-size="11" x=' + (barX - 5) + ' y=315>' + month + '</text>';
            //下标
            text += '<line x1=' + (barX + 10) + ' x2=' + (barX + 10) +
                ' y1="300" y2="305" stroke-width="1" stroke="black"/>';
            //数据
            text += '<rect id="rect" width=20' + ' height=' + parseInt(data[i] * ratio) + ' x=' + barX + ' y=' +
                parseInt((max - data[i]) * ratio) + ' fill="#277DF4"/>';
            barX += 40;
        }
        svgContent.innerHTML = text;
    },
    sortNum: function (a, b) {
        return a - b;
    }
}
export{barLine};