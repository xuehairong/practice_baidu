var regionWrapper = document.getElementById('region-radio-wrapper');
var productWrapper = document.getElementById('product-radio-wrapper');
var tableWrapper = document.getElementById('table-wrapper');

function getData() {
    var newSourceData = [];
    var selectedRegionValue = regionSelect.options[regionSelect.selectedIndex].text;
    var selectedProductValue = productSelect.options[productSelect.selectedIndex].text;
    for (i in sourceData) {
        if (sourceData[i].region == selectedRegionValue && sourceData[i].product == selectedProductValue) {
            newSourceData.push(sourceData[i]);
        }
    }
    return newSourceData;
}

function generateTable() {
    // var data = getData();
    var data = sourceData;
    var str = "<table><thead><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
    str += "<tboday>";
    for (i in data) {
        str += "<tr><td>" + data[i].product + "</td><td>" + data[i].region + "</td>";
        for (s in data[i].sale) {
            str += "<td data-edit='编辑'>" + data[i].sale[s] + "</td>";
        }
        str += "</tr>";
        str += "</tboday>"
    }
    tableWrapper.innerHTML = str;
}



function generateNewTable() {
    var productCheckedList = new Array();
    var regionCheckedList = new Array();
    var productInputs = productWrapper.getElementsByTagName('input');
    var regionInputs = regionWrapper.getElementsByTagName('input');
    for (var i = 0; i < productInputs.length; i++) {
        if (productInputs[i].value != 'all' && productInputs[i].checked == true) {
            productCheckedList.push(productInputs[i].value);
        }
    }
    for (var i = 0; i < regionInputs.length; i++) {
        if (regionInputs[i].value != 'all' && regionInputs[i].checked == true) {
            regionCheckedList.push(regionInputs[i].value);
        }
    }
    var str = "";
    var flag = 0;
    if (productCheckedList.length == 1 && regionCheckedList.length > 1) {
        str += "<table><thead>";
        str += "<th>商品</th><th>地区</th>";
        str += "<th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        str += "<tboday>";
        for (i in sourceData) {
            for (j in regionCheckedList) {
                if (sourceData[i].region == regionCheckedList[j] && sourceData[i].product == productCheckedList[0]) {
                    str += "<tr pro='" + sourceData[i].product + "' reg='" + sourceData[i].region + "'>";
                    if (flag == 0) {
                        str += "<td rowspan=" + regionCheckedList.length + ">" + sourceData[i].product + "</td>";
                    }
                    str += "<td>" + sourceData[i].region + "</td>";
                    for (s in sourceData[i].sale) {
                        str += "<td data-edit=''>" + sourceData[i].sale[s] + "</td>";
                    }
                    str += "</tr>";

                    flag++;
                }
            }

        }
        str += "</tboday>";
    }
    if (productCheckedList.length > 1 && regionCheckedList.length == 1) {
        str += "<table><thead>";
        str += "<th>地区</th><th>商品</th>";
        str += "<th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        str += "<tboday>";
        for (i in sourceData) {
            for (j in productCheckedList) {
                if (sourceData[i].region == regionCheckedList[0] && sourceData[i].product == productCheckedList[j]) {
                    str += "<tr pro='" + sourceData[i].product + "' reg='" + sourceData[i].region + "'>";
                    if (flag == 0) {
                        str += "<td rowspan=" + productCheckedList.length + ">" + sourceData[i].region + "</td>";
                    }
                    str += "<td>" + sourceData[i].product + "</td>";
                    for (s in sourceData[i].sale) {
                        str += "<td data-edit=''>" + sourceData[i].sale[s] + "</td>";
                    }
                    str += "</tr>";

                    flag++;
                }
            }

        }
        str += "</tboday>";
    }
    if (productCheckedList.length > 1 && regionCheckedList.length > 1) {
        str += "<table><thead>";
        str += "<th>商品</th><th>地区</th>";
        str += "<th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        str += "<tboday>";
        for (i in sourceData) {
            for (j1 in productCheckedList) {
                var flag = 0;
                if (sourceData[i].product == productCheckedList[j1]) {
                    for (j2 in regionCheckedList) {
                        if (sourceData[i].region == regionCheckedList[j2]) {
                            str += "<tr pro='" + sourceData[i].product + "' reg='" + sourceData[i].region + "'>";
                            if (flag == 0) {
                                str += "<td rowspan=" + regionCheckedList.length + ">" + sourceData[i].product + "</td>";
                            }
                            str += "<td>" + sourceData[i].region + "</td>";
                            for (s in sourceData[i].sale) {
                                str += "<td data-edit=''>" + sourceData[i].sale[s] + "</td>";
                            }
                            str += "</tr>";

                        }
                        flag++;
                    }
                }
            }
        }
        str += "</tboday>";
    }
    if (productCheckedList.length == 1 && regionCheckedList.length == 1) {
        str += "<table><thead>";
        str += "<th>商品</th><th>地区</th>";
        str += "<th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        str += "<tboday>";
        for (i in sourceData) {
            if (sourceData[i].region == regionCheckedList[0] && sourceData[i].product == productCheckedList[0]) {
                str += "<tr pro='" + sourceData[i].product + "' reg='" + sourceData[i].region + "'>";
                str += "<td>" + sourceData[i].product + "</td>";
                str += "<td>" + sourceData[i].region + "</td>";
                for (s in sourceData[i].sale) {
                    str += "<td data-edit=''>" + sourceData[i].sale[s] + "</td>";
                }
                str += "</tr>";

                flag++;
            }

        }
        str += "</tboday>";
    }

    tableWrapper.innerHTML = str;
}

tableWrapper.onmouseover = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() == 'td' && !isNaN(target.innerHTML)) {
        target.setAttribute('data-edit', '编辑');
    }
}
tableWrapper.onmouseout = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() == 'td' && !isNaN(target.innerHTML)) {
        target.setAttribute('data-edit', '');
    }
}
var num;
tableWrapper.onclick = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var inputs = tableWrapper.getElementsByTagName('input');
    var originData = target.innerHTML;
    if (target.tagName.toLowerCase() != 'td') {
        return;
    }
    if (inputs.length > 0) {
        //如果表格中存在编辑框
        var td = inputs[0].parentNode;
        td.innerHTML = num;
    } else {
        //如果不存在编辑框
        if (!isNaN(target.innerHTML)) {
            num = originData; //生成编辑框就保留原始数据用于还原
            var txt = document.createElement('input');
            txt.type = 'text';
            txt.value = target.innerHTML;

            target.setAttribute('data-edit', '');
            target.innerHTML = '';
            target.appendChild(txt);
            var btnSave = document.createElement('input');
            btnSave.type = 'button';
            btnSave.value = '保存';
            btnSave.onclick = function() {
                if (!isNaN(txt.value) || txt.value == "") {
                    target.innerHTML = txt.value;
                    var tr = target.parentNode;
                    saveData(tr.getAttribute('pro'), tr.getAttribute('reg'), target.cellIndex, txt.value);
                } else {
                    alert("请输入数字");
                }

            }
            target.appendChild(btnSave);
            var btnCancel = document.createElement('input');
            btnCancel.type = 'button';
            btnCancel.value = '取消';
            btnCancel.onclick = function() {
                target.innerHTML = originData;
            }
            target.appendChild(btnCancel);
            txt.onkeydown = function(event) {
                if (event.keyCode == 13) {
                    btnSave.click();
                }
                if (event.keyCode == 27) {
                    btnCancel.click();
                }
            }
        }
    }

}