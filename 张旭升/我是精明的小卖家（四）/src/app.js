// import {barLine} from './barLine.js';
// import {getTableData} from './getTableData.js';
// import {render} from './index.js';
// import {getData} from './index.js'

//初始化相关操作
(function () {
    function init() {
        let data = [];
        data = getData();
        //setHash在后可以使得checked选取
        render();
        setHash();
        hashAllcheck();
        getTableData();
        barLine.drawBar(data[0].sale);
        barLine.drawManyLines();
        LocalStorage.setData();
        
    }
    init();
}());