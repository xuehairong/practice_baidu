
let productSelect = document.getElementById('product-radio-wrapper');
let regionSelect = document.getElementById('region-radio-wrapper');
let tableWrapper = document.getElementById('table-wrapper');
let selectedDiv = document.getElementById('selected');


function getData() {
    let regionValue = selectValue(regionSelect);
    let productValue = selectValue(productSelect);
    let data = [];
    for (let i = 0; i < sourceData.length; i++) {
        for (let j = 0; j < regionValue.length; j++) {
            for (let k = 0; k < productValue.length; k++) {
                if (sourceData[i]['region'] === regionValue[j] && sourceData[i]['product'] === productValue[k]) {
                    data.push(sourceData[i]);
                }
            }
        }
    }
    return data;

}
//获得选择值
function selectValue(dom) {
    let data = [];
    let checkArray = dom.getElementsByTagName('input');
    for (let i = 0; i < checkArray.length - 1; i++) {
        if (checkArray[i].checked === true) {
            data.push(checkArray[i].value);
        }
    }
    return data;
}
//渲染
function render() {
    let regionLength = selectValue(regionSelect).length;
    let productLength = selectValue(productSelect).length;
    let data = getData();
    let text = '';
    let rowSpan = 0;
    let Ename = ['region', 'product'];
    let txt1 = '';
    let txt2 = '';
    if (regionLength > 1 && productLength > 1 || regionLength > 1) {
        txt1 = ['商品', 'product'];
        txt2 = ['地区', 'region'];
        rowSpan = regionLength;
    } else if (productLength > 1) {
        txt1 = ['地区', 'region'];
        txt2 = ['商品', 'product'];
        rowSpan = productLength;
    } else {
        txt1 = ['商品', 'product'];
        txt2 = ['地区', 'region'];
        rowSpan = regionLength;
    }

    //建立表头;
    text = '<table><tr><th>' + txt1[0] + '</th><th>' + txt2[0] + '</th>';

    for (let i = 0; i < 12; i++) {
        text += '<th>' + (i + 1) + '月' + '</th>';
    }
    text += '</tr>';
    //建立表内容
    for (let i = 0; i < data.length; i++) {
        //类型与地区
        if (i % rowSpan === 0) {
            text += '<tr><td rowspan=' + rowSpan + '>' + data[i][txt1[1]] + '</td><td>' + data[i][txt2[1]] + '</td>';
        } else {
            text += '<tr><td>' + data[i][txt2[1]] + '</td>';
        }
        //销售数量
        for (let j = 0; j < data[i].sale.length; j++) {
            text += '<td>' + data[i].sale[j] + '</td>';
        }
        text += '</tr>';
    }
    text += '</tr></table>';
    tableWrapper.innerHTML = text;

}

function compare(regionLength, productLength) {
    if (regionLength === 1) {

    }
}
//生成checkBox
function createCheckBox(dom, array) {
    //全选按钮
    let checkAll = '<label for="">全选<input value="checkall" class= "all" checkbox-type="all" type ="checkBox"></label>';
    let text = '';
    //子按钮
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            text += '<label for="">' + array[i].text + '<input value ="' + array[i].text + '" cheeck === checked checkbox-type="single" type ="checkBox"></label>';
        } else {
            text += '<label for="">' + array[i].text + '<input value ="' + array[i].text + '" checkbox-type="single" type ="checkBox"></label>';
        }

    }
    dom.innerHTML = text + checkAll;
    //事件委托
    dom.onclick = function (e) {
        let checkArray = dom.getElementsByTagName('input');
        let checkAll = dom.getElementsByClassName('all')[0];
        let value = '';
        let number = 0;

        if (e.target.type = "checkBox") {
            //需要注意的是，通过dom节点获得自定义属性的时候 . 不能获得,需要getAttribute方法
            value = e.target.getAttribute('checkbox-type');
            if (value === 'all') {
                for (let i = 0; i < checkArray.length; i++) {
                    checkArray[i].checked = true;
                }
            } else {
                //number 为计数器用来获得当前点击的数量
                for (let i = 0; i < checkArray.length - 1; i++) {
                    if (checkArray[i].checked === true) {
                        number++;
                    }
                }
                if (number === 0) {
                    e.target.checked = true;
                }

                if (number === checkArray.length - 1) {
                    checkAll.checked = true;
                } else {
                    checkAll.checked = false;
                }
            }
        }
        render();
    }
}


createCheckBox(regionSelect, [{
        value: 1,
        text: '华东'
    },
    {
        value: 2,
        text: '华北'
    },
    {
        value: 3,
        text: '华南'
    }
]);
createCheckBox(productSelect, [{
        value: 1,
        text: '手机'
    },
    {
        value: 2,
        text: '笔记本'
    },
    {
        value: 3,
        text: '智能音箱'
    }
]);

function init() {
    getData();
    render();
}
init();