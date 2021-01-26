

var headerHeight = $("#navbar").height();


$('nav ul li a').bind("click", function(e) {

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


$(document).ready(function () {
    if ( $(window).width() < 992) {
        $('#news_list').addClass('collapse');
    }
});

var setDivsState=function(){
    if ( $(window).width() < 992) {
        $(function(){
                $('#news_list').addClass('collapse');
        });
    }
    else {
        $(function(){
                $('#news_list').removeClass('collapse');
        });
    }
}
$(window).resize(setDivsState);