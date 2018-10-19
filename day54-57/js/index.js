function Start() {
    var wrapper = document.getElementById('footballFieldWrapper');
    var footballFieldWrapper = document.getElementById('footballFieldWrapper');
    //世界杯决赛阶段：长度105米（约115码），宽度68米（约74码）
    var footballField = new FootballField(68, 105, wrapper.clientWidth, wrapper.clientHeight)
    footballFieldWrapper.appendChild(footballField.dom);
    //速度为100的球员
    var fb1 = new Footballer(100, 2, footballField.bl);
    fb1.Init(2, 2); //设置球员初始位置
    footballFieldWrapper.appendChild(fb1.dom);
    fb1.Run(14, 2);
    //速度为1的球员
    var fb2 = new Footballer(1, 2, footballField.bl);
    fb2.Init(2, 12); //设置球员初始位置
    footballFieldWrapper.appendChild(fb2.dom);
    fb2.Run(14, 12);
}
Start();