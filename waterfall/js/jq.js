$(window).on('load', function() {
    waterfall();
    var dataInt = {
        data: [
            { src: "P_010.jpg" }, { src: "P_011.jpg" },
            { src: "P_012.jpg" }, { src: "P_013.jpg" },
            { src: "P_014.jpg" }, { src: "P_015.jpg" },
            { src: "P_016.jpg" }, { src: "P_017.jpg" },
            { src: "P_018.jpg" }, { src: "P_019.jpg" }
        ]
    };
    $(window).on('scroll', function() {
        if (checkScrollSlide()) {
            $.each(dataInt.data, function(index, val) {
                var oBox=$('<div>').addClass('box').appendTo($('#main')),
                	oPic=$('<div>').addClass('img').appendTo(oBox);
                	$('<img>').attr('src','images/'
                		 +$(val).attr('src')).appendTo(oPic);
            });
        }
        waterfall();

    })
})

function checkScrollSlide() {
    // 获取最后一个元素的高度和offsetTop
    var lastbox = $('#main>div').eq($('#main>div').length - 1),
        AddH = Math.floor(lastbox.outerHeight() / 2) + lastbox.offset().top,
        // 获取页面高度和scrollTop
        clientH = $(window).height(),
        scrollT = $(window).scrollTop();
    return (AddH < clientH + scrollT) ? true : false;
}

function waterfall() {
    var main = $('#main'),
        box = $('#main>div'),
        bw = box.eq(0).outerWidth(),
        col = Math.floor($(window).width() / bw);
    main.width(col * bw).css('margin', '0 auto');
    var hBox = [];
    box.each(function(index, value) {
        if (index < col) {
            hBox.push(box.eq(index).outerHeight());
        } else {
            var minH = Math.min.apply(null, hBox),
                minhIndex = $.inArray(minH, hBox);
            $(value).css({
                position: 'absolute',
                left: bw * minhIndex + 'px',
                top: minH + 'px'
            });
            hBox[minhIndex] += $(value).outerHeight();
        }
    });
}
