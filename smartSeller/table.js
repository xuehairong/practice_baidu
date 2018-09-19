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
            str += "<td>" + data[i].sale[s] + "</td>";
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
                    if (flag == 0) {
                        str += "<tr><td rowspan=" + regionCheckedList.length + ">" + sourceData[i].product + "</td>";
                    } else {
                        str += "<tr>";
                    }
                    str += "<td>" + sourceData[i].region + "</td>";
                    for (s in sourceData[i].sale) {
                        str += "<td>" + sourceData[i].sale[s] + "</td>";
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
                    if (flag == 0) {
                        str += "<tr><td rowspan=" + productCheckedList.length + ">" + sourceData[i].region + "</td>";
                    } else {
                        str += "<tr>";
                    }
                    str += "<td>" + sourceData[i].product + "</td>";
                    for (s in sourceData[i].sale) {
                        str += "<td>" + sourceData[i].sale[s] + "</td>";
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
                            if (flag == 0) {
                                str += "<tr><td rowspan=" + regionCheckedList.length + ">" + sourceData[i].product + "</td>";
                            } else {
                                str += "<tr>";
                            }
                            str += "<td>" + sourceData[i].region + "</td>";
                            for (s in sourceData[i].sale) {
                                str += "<td>" + sourceData[i].sale[s] + "</td>";
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
                str += "<tr><td>" + sourceData[i].product + "</td>";
                str += "<td>" + sourceData[i].region + "</td>";
                for (s in sourceData[i].sale) {
                    str += "<td>" + sourceData[i].sale[s] + "</td>";
                }
                str += "</tr>";

                flag++;
            }

        }
        str += "</tboday>";
    }

    tableWrapper.innerHTML = str;
}