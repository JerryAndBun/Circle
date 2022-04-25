var loginbox = document.querySelector('.loginbox');
var logintips = document.querySelector('.logintips');
var click = document.querySelector('.click');
var accountswitch = document.querySelector('.login-account-switch');
var accountlogin = document.querySelector('.loginheader');
var loginform = document.querySelector('.loginform');
var switc = document.querySelector('.switch-img');
var qrcodebox = document.querySelector('.qrcodebox');
var statusbutton = document.querySelector('.statusbutton');
var lilist = document.getElementsByClassName('guide');//li列表
var wordlist = document.getElementsByClassName('word');//li下方的文字
var iconlist = document.getElementsByClassName('guideicon');//icon列表
var daohangbox = document.getElementsByClassName('daohangbox');
var lv1guide = document.getElementById('lv1guide');     //获取一级列表
var lv1li = lv1guide.getElementsByTagName('li');          //获取一级列表的li
var icongongneng = document.querySelector('.icon-gongneng');    //功能icon
var daohangboxa = document.querySelector('.daohangboxa');       //功能box的a
var lv2guide = document.getElementById('lv2guide');             //二级列表
var lv2guideul = lv2guide.getElementsByTagName('ul');           //二级列表的ul数组
var lv2li = new Array();
for (let j = 0; j < 13; j++) {
    lv2li[j] = lv2guideul[j].getElementsByTagName('li');          //二级列表的ul数组的li数组
}
var isqr = 1;
// alert(qrcodebox)
// 右侧的icon动画
for (let index = 0; index < 4; index++) {
    lilist[index].onmouseover = function () {
        iconlist[index].style.transform = 'translateY(-6px) scale(80%)'
        wordlist[index].style.visibility = 'visible';
        wordlist[index].style.transform = 'translateY(-16px)'
        wordlist[index].style.opacity = '1'
        wordlist[index].style.color = 'rgb(15,155,241)'
        iconlist[index].style.color = 'rgb(15,155,241)'

    }
    lilist[index].onmouseout = function () {
        iconlist[index].style.transform = 'translateY(0px)'
        iconlist[index].style.fontSize = '18px'
        wordlist[index].style.visibility = 'hidden';
        wordlist[index].style.transform = 'translateY(-5px)'
        wordlist[index].style.opacity = '0'
        wordlist[index].style.color = '#999'
        iconlist[index].style.color = '#999'
    }
}
//范围内的功能盒子动画
function inboxanimate() {
    icongongneng.style.transform = 'rotate(90deg)';
    icongongneng.style.color = 'rgb(15,155,241)';
    daohangboxa.style.color = 'rgb(15,155,241)';
}
function outboxanimate() {
    icongongneng.style.transform = 'rotate(-90deg)';
    icongongneng.style.color = '#999';
    daohangboxa.style.color = '#333';
}
function lv1show() {
    lv1guide.style.visibility = 'visible';
}
function lv1hidden() {
    lv1guide.style.visibility = 'hidden';
}
function lv2show() {
    lv2guide.style.visibility = 'visible'
}
function lv2hidden() {
    lv2guide.style.visibility = 'hidden'
}
//鼠标悬浮显示一二级菜单
//获取一级导航栏的范围
let lv1x = lv1guide.offsetLeft; //一级导航栏距离左边的距离 0
let lv1y = lv1guide.offsetTop;   //距离顶部的距离 60
let lv1X = lv1guide.offsetLeft + lv1guide.offsetWidth;//宽 2003
let lv1Y = lv1guide.offsetTop + lv1guide.offsetHeight;  //底部距离顶部的距离100
let mouseX
let mouseY
let getmouse = function () {
    let event = window.event;
    mouseX = event.clientX;
    mouseY = event.clientY;
}
daohangbox[0].onmouseenter = function () {
    lv1show()
    inboxanimate()
}
//移入移出导航区的判断
daohangbox[0].onmouseleave = function () {
    //获取鼠标的坐标
    getmouse();
    if (mouseY < lv1y) {
        lv1hidden()
        outboxanimate()
    }
}
// 移出lv1li
lv1li = Array.from(lv1li)   //转为数组
var isin = false
var timeout
lv1li.forEach(function (item, index, lv1li) {
    item.onmouseenter = function () {
        isin = true
        timeout = setTimeout(() => {
            lv2show()
            lv2guideul[index].style.display = 'block'
        }, 250);        //延时防抖显示lv2ul
    }
    item.onmouseleave = function () {
        isin = false
        clearTimeout(timeout)   //防抖
        lv2guideul[index].style.display = 'none'  //隐藏lv2ul
        lv2hidden()     //隐藏lv2
        getmouse()
        // 往下去lv2guide
        if (mouseY + 3 > lv1Y && mouseX > item.getBoundingClientRect().left && mouseX < item.getBoundingClientRect().left + 60) {
            lv2guideul[index].style.display = 'block'
            lv2show()
            isin = true
        }
    }
})
lv1guide.onmouseleave = function () {
    if (isin) {
        return
    }
    lv1hidden()
    outboxanimate()
}
// lv2ul
lv2guideul = Array.from(lv2guideul)
lv2guideul.forEach(function (item, index, lv2guideul) {
    item.onmouseleave = function () {
        getmouse()
        if (mouseY + 1 > lv1Y + 40) {
            isin = false
            lv1hidden()
            lv2hidden()
            outboxanimate()
            return
        }
        timeout = setTimeout(() => {
            lv2hidden()
            lv2guideul[index].style.display = 'none'  //隐藏lv2ul
        }, 250);
    }
})
//定时三秒刷新的定时器函数体
window.timerrunner = function () {
    // console.log(qrcodebox);
    if (qrcodebox.style.visibility == 'visible') {
        clearInterval(timer);
    }
    qrcodebox.style.visibility = 'visible';
}
//启动定时器
window.timer = setInterval(window.timerrunner, 3000);
//点击刷新
statusbutton.addEventListener('click', function () {
    clearInterval(window.timer);
    qrcodebox.style.visibility = 'hidden';
    window.timer = setInterval(window.timerrunner, 3000);

})
// window.a = 1
// console.log(window.a);
// export {timer}
switc.addEventListener('click', function () {
    if (isqr === 1) {
        loginbox.style.visibility = "hidden";
        logintips.style.visibility = "hidden";
        click.style.visibility = "hidden";
        accountswitch.innerHTML = "忘记密码";
        accountlogin.innerHTML = "账号登录";
        loginform.style.visibility = "visible";
        qrcodebox.style.visibility = 'hidden';
        clearInterval(timer);
        isqr = -isqr
    }
    else {
        loginform.style.visibility = "hidden";
        loginbox.style.visibility = "visible";
        logintips.style.visibility = "visible";
        click.style.visibility = "visible";
        accountswitch.innerHTML = "账号登录";
        accountlogin.innerHTML = "手机扫码登录";
        isqr = -isqr
        timer = setInterval(window.timerrunner, 3000);

    }
})
