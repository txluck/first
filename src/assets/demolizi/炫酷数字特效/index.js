var num = 1;
var timer = null;
var divContainer = document.getElementById("divContainer")
var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"]
var divCenter = document.getElementById("divCenter")
//开始
function start() {
    if (timer) {
        return
    }
    timer = setInterval(addNumber, 200)
}
//暂停
function stop() {
    if (timer) {
        clearInterval(timer)
        timer = null;
    }
}

//添加数字
function addNumber() {
    console.log("object");
    var span = document.createElement("span")
    span.innerText = divCenter.innerText = num
    //颜色变化
    if (isRight()) {
        var color = colors[getRandom(0, colors.length)];
        span.style.color = color;
        span.style.textShadow = `0 0 3px ${color}`;

        //新建DIV
        var div = document.createElement("div");
        div.className = "center";
        div.innerText = num
        div.style.color = color
        setTimeout(function () {
            console.log("object");
            div.style.transform = `translate(${getRandom(-200,200)}px,${getRandom(-200,200)}px)`
            div.style.opacity = 0
        }, 30)
        document.body.appendChild(div)
        div.addEventListener("transitionend",function(){
            div.remove();
        })
        
    }
    divContainer.appendChild(span);
    span.scrollIntoView();
    num++;
}

//判断数字
function isRight() {
    if(num<2){
        return false
    }
    for(var i = 2;i<num;i++){
        if(num%i==0){
            return false
        }
    }
    return true
}

//随机函数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
document.documentElement.onclick = function () {
    if (timer) {
        stop()
    } else {
        start()
    }
}