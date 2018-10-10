// import {barLine} from './barLine.js';
// import {getTableData} from './getTableData.js';
// import {render} from './index.js';
// import {getData} from './index.js'

//初始化相关操作
(function () {
    function init() {
        let data = [];
        data = getData();
        render();
        getTableData();
        barLine.drawBar(data[0].sale);
        barLine.drawManyLines();
        LocalStorage.setData();
        
    }
    init();
}());