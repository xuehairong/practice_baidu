// import {
//     sourceData
// } from './data.js';

let productSelect = document.getElementById('product-radio-wrapper');
let regionSelect = document.getElementById('region-radio-wrapper');
let tableWrapper = document.getElementById('table-wrapper');
let selectedDiv = document.getElementById('selected');

function getData() {
    let regionValue = [];
    let productValue = [];
    let hashData = getHash();
    if (location.hash === '') {
        regionValue = selectValue(regionSelect);
        productValue = selectValue(productSelect);
    }
    else {
    for (let i = 0; i < hashData.length; i++) {
        if (['华东', '华北', '华南'].indexOf(hashData[i]) !== -1) {
            regionValue.push(hashData[i]);
        } else {
            productValue.push(hashData[i]);
        }
    }
    }
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

function hrefValue() {
    let value = window.location.href.split('?')[1];
    return value;
}
//渲染
function render() {
    let hashData = getHash();
    let region = [];
    let product = [];
    //根据长度来进行表格合并
    let regionLength,
        productLength;

    let value = hrefValue() || '';
    if (value === '') {
        regionLength = selectValue(regionSelect).length;
        productLength = selectValue(productSelect).length;
    } else {
        for (let i = 0; i < hashData.length; i++) {
            if (['华东', '华北', '华南'].indexOf(hashData[i]) !== -1) {
                region.push(hashData[i]);
            } else {
                product.push(hashData[i]);
            }
        }
        regionLength = region.length;
        productLength = product.length;

    }

    data = getData();



    let text = '';
    let rowSpan = 0;
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
            text += '<tr td-sign=' + data[i][txt1[1]] + '><td   rowspan=' + rowSpan + '>' + data[i][txt1[1]] +
                '</td><td td-sign=' + data[i][txt2[1]] + '>' + data[i][txt2[1]] + '</td>';
        } else {
            text += '<tr td-sign=' + data[i][txt1[1]] + '><td td-sign=' + data[i][txt2[1]] + '>' + data[i][txt2[1]] + '</td>';
        }
        //销售数量

        //判断LocalStorage里面是否有数据
        for (let j = 0; j < data[i].sale.length; j++) {
            let value = localStorage.getItem('data' + i + j);
            if (value) {
                text += '<td>' + value + '</td>';
            } else {
                text += '<td>' + data[i].sale[j] + '</td>';
            }
        }
        text += '</tr>';
    }
    text += '</tr></table>';
    tableWrapper.innerHTML = text;
    //获取href？后的值
    // let value = hrefValue();

    if (value !== '') {
        let regionInput = document.getElementById('region-radio-wrapper').getElementsByTagName('input');
        let productInput = document.getElementById('product-radio-wrapper').getElementsByTagName('input');
        for (let i = 0; i < regionInput.length; i++) {
            if (region.indexOf(regionInput[i].value) !== -1) {
                regionInput[i].checked = true;
            } else {
                regionInput[i].checked = false;
            }
        }

        for (let i = 0; i < productInput.length; i++) {
            if (product.indexOf(productInput[i].value) !== -1) {
                productInput[i].checked = true;
            } else {
                productInput[i].checked = false;
            }
        }
        hashAllcheck();
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
            text += '<label for="">' + array[i].text + '<input value ="' + array[i].text + '" checked = "checked" checkbox-type="single" type ="checkBox"></label>';
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
        setHash();
        render();
    }
}
//hash的全选
function hashAllcheck() {
    let regionInput = document.getElementById('region-radio-wrapper').getElementsByTagName('input');
    let productInput = document.getElementById('product-radio-wrapper').getElementsByTagName('input');
    let regionCheckAll = document.getElementById('region-radio-wrapper').getElementsByClassName('all')[0];
    let productCheckAll = document.getElementById('product-radio-wrapper').getElementsByClassName('all')[0];
    numberRegion = 0;
    numberProduct = 0;
    for (let i = 0; i < regionInput.length; i++) {
        if (regionInput[i].checked === true) {
            numberRegion++;
        }
    }
    if (numberRegion === 3) {
        regionCheckAll.checked = true;
        numberRegion = 0;
    }
    for (let i = 0; i < productInput.length; i++) {
        if (productInput[i].checked === true) {
            numberProduct++;
        }
    }
    if (numberProduct === 3) {
        productCheckAll.checked = true;
        numberProduct = 0;
    }
}

function setHash() {
    let regionS = selectValue(regionSelect);
    let producS = selectValue(productSelect);
    let regionHash = '';
    let producHash = '';
    //分隔符
    for (let i = 0; i < regionS.length; i++) {
        regionHash += encodeURI(regionS[i]);
    }
    for (let i = 0; i < producS.length; i++) {
        producHash += encodeURI(producS[i]);
    }
    window.history.pushState(null, null, '?' + regionHash + producHash);
}


function getHash() {

    let value = hrefValue() || '';
    if (value === '') {
        return;
    }
    let stringArray = ['华东', '华南', '华北', '手机', '笔记本', '智能音箱'];
    let data = [];
    //进行编码
    //使用encodeURI能够转换编码,然后删除没被选择的
    for (let i = 0; i < stringArray.length; i++) {
        if (value.indexOf(encodeURI(stringArray[i])) !== -1) {
            let string = decodeURI(stringArray[i]);
            data.push(string);
        }
    }
    return data;
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
window.onpopstate = function () {
    render();
}
// export {render, getData};