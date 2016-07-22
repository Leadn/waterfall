window.onload = function() {
        waterfall('main', 'box');
        window.onscroll = function() {
            var oMain = document.getElementById('main'),
                dataInt = {
                    data: [
                        { src: "P_010.jpg" }, { src: "P_011.jpg" },
                        { src: "P_012.jpg" }, { src: "P_013.jpg" },
                        { src: "P_014.jpg" }, { src: "P_015.jpg" },
                        { src: "P_016.jpg" }, { src: "P_017.jpg" },
                        { src: "P_018.jpg" }, { src: "P_019.jpg" }
                    ]
                };
            if (checkScrollSlide('main', 'box')) {
                for (var i = 0; i < dataInt.data.length; i++) {
                    // 创建.box元素
                    var boxE=document.createElement('div');
                        boxE.className='box';
                        oMain.appendChild(boxE);
                    // 创建.img元素
                     var picE=document.createElement('div');
                         picE.className='img';
                         boxE.appendChild(picE);
                    // 创建图片元素
                    var imgE=document.createElement('img');
                        imgE.src='images/'+dataInt.data[i].src;
                        picE.appendChild(imgE);
                }
                waterfall('main', 'box');
            }
        }
    }
    // 判断是否可以加载
function checkScrollSlide(parentName, childName) {
    // 获取最后一个元素的高度和offsetTop的和,
    var oBox = getByClassName(parentName, childName),
        AddH = oBox[oBox.length - 1].offsetTop +
        Math.floor(oBox[oBox.length - 1].offsetHeight / 2),
        // 获取页面高度和scrollTop
        clientH = document.documentElement.clientHeight || document.body.clientHeight,
        scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    return (clientH + scrollT) > AddH ? true : false;
}
// 定位
function waterfall(parentName, childName) {
    var oParent = document.getElementById(parentName),
        oChild = getByClassName(parentName, childName),
        boxW = oChild[0].offsetWidth, //获取元素宽度
        col = Math.floor(document.documentElement.clientWidth / boxW); //计算每行个数
    oParent.style.cssText = 'width:' + col * boxW + 'px;margin:0 auto';
    // 获得所有元素的高，放在数组中，找出最小值，设置新元素的高
    var hBox = [];
    for (var i = 0; i < oChild.length; i++) {
        if (i < col) {
            hBox.push(oChild[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hBox);
            var index = getIndex(hBox, minH);
            oChild[i].style.position = 'absolute';
            oChild[i].style.left = oChild[index].offsetLeft + 'px';
            oChild[i].style.top = minH + 'px';
            hBox[index] += oChild[i].offsetHeight;
        }

    }
}
// 获得最小值所在位置
function getIndex(array, minH) {
    for (var i in array) {
        if (array[i] == minH) {
            return i;
        }
    }
}

// 通过类名获取元素
function getByClassName(parent, clsName) {
    var parent = document.getElementById(parent),
        array = new Array(),
        child = parent.getElementsByTagName('*');
    for (var i = 0; i < child.length; i++) {
        if (child[i].className == clsName) {
            array.push(child[i]);
        }
    }
    return array;
}
