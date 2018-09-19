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
            // var checkboxType = target.getAttribute('checkbox-type');
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
                        flag = false;
                    }
                }
                elementAll.checked = flag;
            }
            generateNewTable();
        }
    }
}