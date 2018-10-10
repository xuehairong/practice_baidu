'use strict'
var dateUi = (function () {
    function CreateDate(container, mulit, min, max) {
        this.dom = document.querySelector(container);
        this.mulit = mulit;
        this.min = min;
        this.max = max;
        this.date = new Date();
        this.init();
        //渲染的日期
        this.pDate = "";

    }
    //原型方法
    CreateDate.prototype = {
        //创建日历
        init: function () {
            var year = this.date.getFullYear();
            var month = this.date.getMonth();
            var day = this.date.getDate();
            this.render(year, month, day);
            this.addEvent(month, year, day);
        },
        //渲染当前月的表格
        render: function (year, month, day, domArr) {
            //inout渲染
            var dateContainer = document.querySelector(".dateContainer");
            dateContainer.innerHTML = '<label for ="dateInput">请用户选择日期</label>' +
                '<input id = "dateInput" type = "text">';
            //日历渲染
            var dateArr = [{
                    name: "sun",
                    text: "日"
                },
                {
                    name: "scope",
                    text: "一"
                },
                {
                    name: "scope",
                    text: "二"
                },
                {
                    name: "scope",
                    text: "三"
                },
                {
                    name: "scope",
                    text: "四"
                },
                {
                    name: "scope",
                    text: "五"
                },
                {
                    name: "sun",
                    text: "六"
                }
            ];
            //创建日历年、月
            this.dom.innerHTML = '<p><a id="prev" herf = "" rel = "prev">&lt;</a>' +
                year + '年' + (month + 1) + '月' +
                '<a id="next" herf = "" rel = "next">&gt;</a></p>';

            //创建日历星期
            var text = '';
            for (var i = 0; i < dateArr.length; i++) {
                text += '<span class = ' + dateArr[i].name + '>' +
                    dateArr[i].text + '</span>';
            }
            //当前月数当容器

            //获取当前月份的最后一天，用当前月份+1 获得后一月，然后再用后一月天数-1即可。
            var lastDay = new Date(year, month + 1, 1 - 1).getDate();

            //获取当前月的第一天为周几
            var fdIsWeek = new Date(year, month, 1).getDay();

            //获取当前上一月的最后一天
            var prevMonthDay = new Date(year, month, 1 - 1).getDate();

            //获取下一月的第一天
            var firstDay = new Date(year, month + 1, 1).getDate();

            fdIsWeek = fdIsWeek === 0 ? 6 : (fdIsWeek - 1);
            //创建当前月的第一天为周几，上一月的末尾
            for (var i = 0; i <= fdIsWeek; i++) {
                text += '<span class = "prevNull">' + (prevMonthDay - fdIsWeek + i) + '</span>';
            }
            //渲染当前月
            for (var i = 1; i <= lastDay; i++) {
                text += '<span class = "nowDay">' + i + '</span>';
            }
            //渲染
            this.dom.innerHTML += text;
            //清空，便于DOM渲染
            text = '';
            //创建下一月的表格
            var spans = document.getElementsByTagName("span");
            for (var i = 1; i < 15; i++) {
                if ((spans.length + i) <= 49) {
                    text += '<span class = "nextNull">' + i + '</span>';
                }
            }
            //创建button按钮
            text += '<div class="btDiv"><button type="button" class = "confirm">确认</button>' +
                '<button type= "button" class = "cancer">取消</button></div>';
            this.dom.innerHTML += text;

            //判断是否为以前渲染过后的月份，是的话渲染！
            var renderYear = year + '年' + (month + 1) + '月';
            if (this.pDate === renderYear) {
                this.renderSelected(domArr);
            }
        },
        //监听事件
        addEvent: function (month, year, day) {
            var that = this;
            var domArr = [];

            var spans = document.getElementsByTagName("span");
            //Input 监听事件
            this.dom.className = "dateHide";
            dateInput.addEventListener("focus", function () {
                if (that.dom.className === "dateHide") {
                    that.dom.className = "date";
                } else {
                    that.dom.className = "date";
                }
            });
            //日期监听事件
            this.dom.addEventListener("click", function (e) {
                if (e.target.className === "prevNull" || e.target.id === "prev") {
                    that.dom.innerHTML = '';
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                    that.render(year, month, day, domArr);
                } else if (e.target.className === "nextNull" || e.target.id === "next") {
                    that.dom.innerHTML = '';
                    month = month + 1;
                    if (month > 11) {
                        year = year + 1;
                        month = 0;
                    }
                    that.render(year, month, day, domArr);
                } else {
                    if (e.target.nodeName === "SPAN") {
                        that.flow(e.target, domArr);
                    }
                }
            });
            //按钮监听时间
            this.dom.addEventListener("click", function (e) {
                var text = '';
                if (e.target.className === "confirm") {
                    if (domArr.length > 1) {
                        text = that.pDate + spans[domArr[0]].innerText + "日" + "到";
                        text += that.pDate + spans[domArr[1]].innerText + "日";
                    } else {
                        text = pDate + spans[domArr[0]].innerText + "日";
                    }
                    alert("您选择的是" + text);
                    dateInput.value = text;
                    that.dom.className = "dateHide";
                } else if (e.target.className === "cancer") {
                    that.dom.className = "dateHide";
                }
            });
            //获取渲染的月份与年份
        },
        //流程控制
        flow: function (e, domArr) {
            var spans = document.getElementsByTagName("span");
            var min, max;
            var index = this.getSeleteDateIndex(e);
            //判断是否为时间段还是为单个日期
            if (this.mulit) {
                //判断时间段的流程
                if (domArr.length < 1) {
                    domArr.push(index);
                    this.renderSelected(domArr);
                } else {
                    if (domArr[1]) {
                        min = domArr[1];
                    } else {
                        min = domArr[0];
                    }
                    max = index;
                    var dayNum = Math.abs(min - max);
                    if (min === max || dayNum < this.min || dayNum > this.max) {
                        alert("时间不在范围内!");
                    } else {
                        domArr.push(index);
                        this.renderSelected(domArr);
                    }
                }
                //处理边界信息
                if (domArr.length > 2) {
                    if (domArr[2] && domArr[0] === domArr[2]) {
                        domArr.shift();
                    } else {
                        spans[domArr[0]].className = "nowDay";
                        domArr.shift();
                    }
                }
            } else {
                //判断单个时间的流程
                if (domArr.length === 1) {
                    domArr[0].className = "nowDay";
                    domArr.pop();
                }
                domArr.push(index);
                this.renderSelected(domArr);
            }
            this.renderSelected(domArr);

            // return domArr;
        },

        /**
         * 渲染所选择的日历;
         * @param {Array} option 用户点击数字的下标
         */
        renderSelected: function (domArr) {
            var spans = document.getElementsByTagName("span");
            var minDate = 0;
            var maxDate = 0;
            for (var i = 0; i < domArr.length; i++) {
                spans[domArr[i]].className = "selected";
            }
            //总结call的方法用法;
            //清空之前的渲染
            for (var i = 0; i < spans.length; i++) {
                if (spans[i].className === "selectedDay") {
                    spans[i].className = "nowDay";
                }
            }
            // if (spans[minDate] !== domArr[0]) {
            minDate = domArr[0];
            maxDate = domArr[1];
            // }
            //判断dom节点谁大谁小，并且交换。
            if (minDate > maxDate && maxDate !== -1) {
                var t = minDate;
                minDate = maxDate;
                maxDate = t;
            }
            //不渲染选择dom节点自身

            minDate = minDate + 1;
            //渲染所选中dom节点之间的元素;
            for (var i = minDate; i < maxDate; i++) {
                spans[i].className = "selectedDay";
            }
            this.pDate = this.dom.getElementsByTagName("p")[0].innerText;
            this.pDate = this.pDate.slice(1, this.pDate.length - 1);
        },
        getSeleteDateIndex: function (e) {
            var spans = document.getElementsByTagName("span");
            var index = 0;
            index = [].indexOf.call(spans, e);
            return index;
        },
        value: function () {
            var date = dateInput.value;
            return date;
        }
    }
    return CreateDate;

})();
var date = new dateUi(".date", true, 3, 10);