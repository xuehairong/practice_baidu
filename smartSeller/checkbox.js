var regionWrapper = document.getElementById('region-radio-wrapper');
var productWrapper = document.getElementById('product-radio-wrapper');
var tableWrapper = document.getElementById('table-wrapper');

function createCheckBox(wrapperId, data) {
    var wrapper = document.getElementById(wrapperId);
    var str = '<input type="checkbox" value="all" checkbox-type="all"><span>全选</span>';
    for (i in data) {
        str += '<input type="checkbox" value="' + data[i].value + '">' + data[i].text;
    }
    wrapper.innerHTML = str;
    wrapper.onclick = function(e) {
        var checkboxList = wrapper.getElementsByTagName('input');
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.type == 'checkbox') {
            var checkedValue = '';
            // ???????????????
            if (target.value == 'all') {
                for (var i = 0; i < checkboxList.length; i++) {
                    checkboxList[i].checked = target.checked;
                }
            } else {
                var flag = true;
                var elementAll;
                for (var j = 0; j < checkboxList.length; j++) {
                    if (checkboxList[j].value == 'all') {
                        elementAll = checkboxList[j];
                    }
                    if (checkboxList[j].value != 'all' && checkboxList[j].checked != true) {
                        //??????????????????????
                        flag = false;
                    }

                }
                elementAll.checked = flag;
            }
            for (var k = 0; k < checkboxList.length; k++) {
                if (checkboxList[k].checked == true) {
                    checkedValue += checkboxList[k].value + '|';
                }
            }
            setHashValue(wrapperId, checkedValue.substring(0, checkedValue.length - 1));
            generateNewTable();
        }
    }
}

function getHashValue() {
    var result = "";
    var str = location.hash;
    result = str.substr(1, str.length - 1);
    return unescape(result);
}
//??hash???#id1:value1|value2|&id2:value3|value4
function setHashValue(wrapperId, checkedValue) {
    var content = getHashValue();
    if (content == "") {
        content = wrapperId + ':' + checkedValue;
    } else if (content.indexOf(wrapperId) >= 0) {
        var array = content.split('&');
        for (var i = 0; i < array.length; i++) {
            if (array[i].indexOf(wrapperId) >= 0) {
                array[i] = wrapperId + ':' + checkedValue;
            }
        }
        content = array.join('&');
    } else {
        content += '&' + wrapperId + ':' + checkedValue;
    }
    location.hash = '#' + escape(content);
    // console.log("setHashValue():" + content);
}

function resetCheckBox() {
    var content = getHashValue();
    // console.log(content);
    if (content != "") {
        var array = content.split('&');
        for (var i in array) {
            var arrayId = array[i].split(':');
            var wrapper = document.getElementById(arrayId[0]);
            var checkboxList = wrapper.getElementsByTagName('input');
            var valueArray = arrayId[1].split('|');
            // console.log(valueArray);
            for (j in valueArray) {
                for (var k = 0; k < checkboxList.length; k++) {
                    // console.log(checkboxList[k].value == valueArray[j]);
                    if (checkboxList[k].value == valueArray[j]) {
                        // console.log(checkboxList[k]);
                        checkboxList[k].checked = true;
                    }
                }
            }
        }
    }
}