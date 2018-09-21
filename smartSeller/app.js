var regionSelect = document.getElementById('region-select');
var productSelect = document.getElementById('product-select');
createCheckBox('region-radio-wrapper', [{
    value: '华东',
    text: '华东'
}, {
    value: '华南',
    text: '华南'
}, {
    value: '华北',
    text: '华北'
}]);
createCheckBox('product-radio-wrapper', [{
    value: '手机',
    text: '手机'
}, {
    value: '笔记本',
    text: '笔记本'
}, {
    value: '智能音箱',
    text: '智能音箱'
}]);
regionSelect.onchange = function() {
    generateTable();
}
productSelect.onchange = function() {
    generateTable();
}
CreateBarChart();