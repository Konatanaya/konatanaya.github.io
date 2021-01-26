var headerHeight = $("#navbar").height();

// Attach the click event
$('a').bind("click", function(e) {

    var target = $(this).attr("href"); //Get the target
    var scrollToPosition = $(target).offset().top - headerHeight-50;

    $('html, body').animate({ 'scrollTop': scrollToPosition }, 800, function(target){
        window.location.hash = target;
    });

    e.preventDefault();
});

$(".nav .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});

//$(window).scroll(function(){
//    var scrollTop = $(document).scrollTop();
//    var scrollBottom = $(window).height()+scrollTop;
//    var anchors = $('body').find('.main-panel');
//    console.log($(anchors[0]).offset().top, $(anchors[0]).offset().top+$(anchors[0]).height(), $(anchors[1]).offset().top, scrollTop)
//    for (var i = 0; i < anchors.length; i++){
//
//        if (scrollTop > $(anchors[i]).offset().top - 70 - 100 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 100 - 70) {
//            $('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
//        } else {
//            $('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
//        }
//    }
//
//    if (scrollTop<$(anchors[0]).offset().top){
//        $('nav ul li a[href="#' + $(anchors[0]).attr('id') + '"]').addClass('active');
//    }
//    else if (scrollBottom >= $(anchors[anchors.length-1]).offset().top+$(anchors[anchors.length-1]).height()){
//        $('nav ul li a[href="#' + $(anchors[anchors.length-1]).attr('id') + '"]').addClass('active');
//    }
//
//});
