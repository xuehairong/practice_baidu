// import {barLine} from './barLine.js';
// import {sourceData} from './data.js';
function getTableData() {
    let tableWrapper = document.getElementById('table-wrapper');
    let body = document.getElementsByTagName('body')[0];
    tableWrapper.onmouseover = function (e) {
        if (e.target.nodeName === 'TD') {
            let data = [];
            let tds = e.target.parentElement.getElementsByTagName('td');
            let tr = e.target.parentElement;
            //图表的渲染方式
            for (let i = 0; i < tds.length; i++) {
                let text = tds[i].getAttribute('td-sign');
                if (text) {
                    data.push(text);
                }
            }
            let text = tr.getAttribute('td-sign');
            //保持数据格式，即地区在前，商品在后
            if (text !== null) {
                if (text.indexOf('华北') === 0 || text.indexOf('华东') === 0 || text.indexOf('华南') === 0) {
                    data.unshift(text);
                } else {
                    data.push(text);
                }
            }
            //获取表格数据
            if (data === null || data === undefined) {
                return;
            }
            for (let i = 0; i < sourceData.length; i++) {
                for (let j = 0; j < sourceData.length; j++) {
                    if (sourceData[i]['region'] === data[0] && sourceData[i]['product'] === data[1]) {
                        data = sourceData[i].sale;
                    }
                }
            }
            barLine.drawLine(data);
            barLine.drawBar(data);
        }
    }
    body.onmouseover = function (e) {
        if (e.target.nodeName !== 'TD') {
            barLine.drawManyLines();
        }
    }
    //input点击与移动事件
    tableWrapper.addEventListener('click', function (e) {
        //设置互斥条件
        let isTrue = LocalStorage.mutex();
        if (isNaN(e.target.textContent) === false && isTrue === true && e.target.textContent !== '') {
            let value = e.target.textContent;
            e.target.innerHTML = '<td><input id="inputNum" value=' + value +
                '><button id="confirm">确认</button><button id="cancel">取消</button>';
            LocalStorage.buttonClick();
        }
    });

}
// export {getTableData};