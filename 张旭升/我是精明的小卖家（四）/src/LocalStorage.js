let LocalStorage = {
    setData: function () {
        let submit = document.getElementById('submit');

        submit.onclick = function () {
            let data = [];
            let tableWrapper = document.getElementById('table-wrapper');
            let tds = tableWrapper.getElementsByTagName('td');
            let k = 0;
            for (let i = 0; i < tds.length; i++) {
                if (isNaN(tds[i].innerText) === false) {
                    data.push(tds[i].innerText);

                }
            }
            console.log(data);
            //行列控制,提取数字简易
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 12; j++) {
                    if (k < data.length) {
                        localStorage.setItem("data" + i + j, data[k]);
                        k++;
                    }
                }
            }
        }

    },
    buttonClick: function () {
        let body = document.getElementsByTagName('body')[0];
        let confirm = document.getElementById('confirm');
        let cancel = document.getElementById('cancel');

        let parsent = confirm.parentElement;
        let input = parsent.firstChild;
        let value = input.value;
        confirm.addEventListener('click', function () {
            parsent.innerHTML = '<td>' + input.value + '</td>';

        });
        cancel.addEventListener('click', function () {
            parsent.innerHTML = '<td>' + value + '</td>';

        });
        body.addEventListener('click', function (e) {
            if (e.target.nodeName !== 'TD' && e.target.id !== "inputNum" && e.target.nodeName !== "BUTTON" && e.target.nodeName !== 'I') {

                if (LocalStorage.mutex()) {
                    parsent.innerHTML = '<td>' + parsent.textContent + '</td>';

                } else {
                    parsent.innerHTML = '<td>' + value + '</td>';
                }
            }
        });
        input.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                parsent.innerHTML = '<td>' + input.value + '</td>';

            } else if (e.keyCode === 27) {
                parsent.innerHTML = '<td>' + value + '</td>';

            }

        });

    },
    mutex: function () {
        let tableWrapper = document.getElementById('table-wrapper');
        let input = tableWrapper.getElementsByTagName('input');
        if (input.length !== 0) {
            return false
        } else {
            return true;
        }
    },

}