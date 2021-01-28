

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

$("#news_button").on("click", function(){
    if($("#news_span").html()==="Show News"){
        $("#news_span").text("Hide News");
    }
    else{
        $("#news_span").text("Show News");
    }
});

$(window).resize(function () {
    $('#news').width($('#news-col').width()-20);
}).resize();

$(document).ready(function(){
    var test = /-min\./;
    $("img").each(function(index,obj){
        if(test.test($(this).attr("src"))){
            var reSrc = $(this).attr("src").replace(test,".");
            $(this).attr("src",reSrc)
        }
    })
});