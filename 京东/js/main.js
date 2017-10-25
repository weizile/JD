/**
 * Created by Administrator on 2017/10/19 0019.
 */
window.onload = function() {
    //轮播图对象
    var banCarousel = {
        pic : document.querySelectorAll('.lunbo>img'),
        outWrap: document.querySelector('.lunbo'),
        next:document.querySelector('.tonext'),
        pre:document.querySelector('.topre'),
        liArr:document.querySelectorAll('.index li')
    };

    //轮播图
    carousel(banCarousel);
    //轮播图封装
    function carousel(obj){
        var index = 0;
        var timer;
        obj.pic[0].style.zIndex = '1';
        obj.outWrap.onmouseover = function () {
            obj.next.style.display = 'block';
            obj.pre.style.display = 'block';
            clearInterval(timer);
        };
        obj.outWrap.onmouseout = function () {
            obj.next.style.display = 'none';
            obj.pre.style.display = 'none';
            autoplay();
        };
        obj.next.onmouseenter = function () {
            this.style.backgroundColor = 'rgba(0,0,0,0.3)';
        };
        obj.next.onmouseout = function () {
            this.style.backgroundColor = 'rgba(0,0,0,0.1)';
        };
        obj.pre.onmouseenter = function () {
            this.style.backgroundColor = 'rgba(0,0,0,0.3)';
        };
        obj.pre.onmouseout = function () {
            this.style.backgroundColor = 'rgba(0,0,0,0.1)';

        };
        //启动
        autoplay();

        //向右
        obj.next.onclick = function () {
            nextTo();
        };

        //向左
        obj.pre.onclick = function () {
            preTo();
        };

        //鼠标进入小圆点
        for(var i = 0;i<obj.liArr.length;i++){
            obj.liArr[i].count = i;
            obj.liArr[i].onmouseenter = function(){
                var gap = this.count - index;
                if(gap != 0){
                    obj.pic[index].style.zIndex = '2';
                    obj.pic[index + gap].style.zIndex = '1';
                    obj.pic[index].style.transition = 'all 0.4s';
                    obj.pic[index].style.opacity = '0';
                    obj.pic[index].addEventListener('transitionend', fn);
                    index += gap;
                    for(var i = 0;i<obj.liArr.length;i++){
                        obj.liArr[i].classList.remove('active');
                    };
                    obj.liArr[index].classList.add('active');
                }
            }
        }

        function nextTo(){
            obj.pic[index].style.zIndex = '2';
            if (index >= 7) {
                obj.pic[0].style.zIndex = '1';
            }
            else {
                obj.pic[index + 1].style.zIndex = '1';
            }
            obj.pic[index].style.transition = 'all 0.4s';
            obj.pic[index].style.opacity = '0';
            obj.pic[index].addEventListener('transitionend', fn);
            if(index >=7){
                index = 0;
            }else{
                index++;
            };
            for(var i = 0;i<obj.liArr.length;i++){
                obj.liArr[i].classList.remove('active');
            }
            obj.liArr[index].classList.add('active');
        };
        function fn() {
            this.style.zIndex = '0';
            this.style.opacity = '1';
            this.style.transition = '';
        };
        function preTo(){
            obj.pic[index].style.zIndex = '2';
            if (index <= 0) {
                obj.pic[7].style.zIndex = '1';
            }
            else {
                obj.pic[index - 1].style.zIndex = '1';
            }
            obj.pic[index].style.transition = 'all 0.4s';
            obj.pic[index].style.opacity = '0';
            obj.pic[index].addEventListener('transitionend', fn);
            if(index <=0){
                index = 7;
            }else{
                index--;
            };
            for(var i = 0;i<obj.liArr.length;i++){
                obj.liArr[i].classList.remove('active');
            }
            obj.liArr[index].classList.add('active');
        };
        //autoplay
        function autoplay(){
            clearInterval(timer);
            timer=setInterval(function(){
                nextTo();
            },3000);
        }
    };

    //顶部搜索框
    var topSearch = document.querySelector('.search-bar');
    var ht = document.querySelector('.contents').offsetTop;
    //左边tab
    var leftTab = document.querySelector('.left-list');
    var hl = document.querySelector('.enjoy').offsetTop-50;
    window.onscroll = function(){
        leader = scroll().top;
        if(leader > document.querySelector('.enjoy').offsetTop-80 && leader < document.querySelector('.love-live').offsetTop-80){
            for(var j =0;j<leftTabArr.length;j++){
                leftTabArr[j].classList.remove('active');
            };
            leftTabArr[0].classList.add('active');
        }
        else if(leader > document.querySelector('.love-live').offsetTop-80 && leader < document.querySelector('.footer').offsetTop-80){
            for(var j =0;j<leftTabArr.length;j++){
                leftTabArr[j].classList.remove('active');
            };
            leftTabArr[1].classList.add('active');
        }
        if(scroll().top >= ht){
            topSearch.style.top = '0';
        }
        else{
            topSearch.style.top = '-100%';
        };
        if(scroll().top >= hl){
            leftTab.classList.add('showin');
        }else{
            leftTab.classList.remove('showin');
        }
    };

    //scroll封装
    function scroll(){
        if(window.pageYOffset !== undefined){
            return {
                "top": window.pageYOffset,
                "left": window.pageXOffset
            };
        }else if(document.compatMode === "CSS1Compat"){
            return {
                "top": document.documentElement.scrollTop,
                "left": document.documentElement.scrollLeft
            };
        }else{
            return {
                "top": document.body.scrollTop,
                "left": document.body.scrollLeft
            };
        }

        //简单封装（实际工作使用）
//            return {
//                "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
//                "left":  window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
//            }
    }

    //楼层跳跃
    var leftTabArr = document.querySelectorAll('.left-list li');
    var target = 0;
    var leader = 0;
    var timer;
    for(var i=0;i<leftTabArr.length;i++){
        //属性绑定索引值
        leftTabArr[i].index = i;
        //循环绑定，为每一个li绑定点击事件
        leftTabArr[i].onclick = function () {
            for(var j =0;j<leftTabArr.length;j++){
                leftTabArr[j].classList.remove('active');
            };
            this.classList.add('active');
            switch (this.index)
            {
                case 0:target = document.querySelector('.enjoy').offsetTop-80;break;
                case 1:target = document.querySelector('.love-live').offsetTop-80;break;
                case 11:target =0;
            }
            clearInterval(timer);
            timer = setInterval(function () {
                //获取步长
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                //屏幕滑动
                leader = leader + step;
                window.scrollTo(0,leader);
                if(Math.abs(target-leader)<=Math.abs(step)){
                    window.scrollTo(0,target);
                    clearInterval(timer);
                }
            },25);
        }
    };
}
