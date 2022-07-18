var loginbox = document.querySelector('.loginbox')
var logintips = document.querySelector('.logintips')
var clicklink = document.querySelector('.clicklink')
var accountswitch = document.querySelector('.login-account-switch')
var accountlogin = document.querySelector('.loginheader')
var loginform = document.querySelector('.loginform')
var switc = document.querySelector('.switch-img')
var qrcodebox = document.querySelector('.qrcodebox')
var statusbutton = document.querySelector('.statusbutton')
//定时三秒刷新的定时器函数体
window.timerrunner = function () {
  if (qrcodebox.style.visibility == 'visible') {
    clearInterval(window.timer)
  }
  qrcodebox.style.visibility = 'visible'
}
//启动定时器
window.timer = setInterval(window.timerrunner, 3000)
statusbutton.addEventListener('click', function () {
  clearInterval(window.timer)
  qrcodebox.style.visibility = 'hidden'
  timer = setInterval(window.timerrunner, 3000)
})
//点击刷新
window.isqr = 1
switc.addEventListener('click', function () {
  if (window.isqr === 1) {
    loginbox.style.visibility = 'hidden'
    logintips.style.visibility = 'hidden'
    clicklink.style.visibility = 'hidden'
    accountswitch.innerHTML = '忘记密码'
    accountlogin.innerHTML = '账号登录'
    loginform.style.visibility = 'visible'
    qrcodebox.style.visibility = 'hidden'
    clearInterval(window.timer)
    window.isqr = -window.isqr
  } else {
    loginform.style.visibility = 'hidden'
    loginbox.style.visibility = 'visible'
    logintips.style.visibility = 'visible'
    clicklink.style.visibility = 'visible'
    accountswitch.innerHTML = '账号登录'
    accountlogin.innerHTML = '手机扫码登录'
    window.isqr = -window.isqr
    timer = setInterval(window.timerrunner, 3000)
  }
})
