// Effect triggered when nav button is clicked
$('nav ul li a').bind("click", function(e) {
    var headerHeight = $("#navbar").height();
    var target = $(this).attr("href"); //Get the target
    var scrollToPosition = $(target).offset().top - headerHeight-250;

    $('html, body').animate({ 'scrollTop': scrollToPosition }, 800, function(target){
        window.location.hash = target;
    });

    e.preventDefault();
});

$(".nav .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});

// Button for expanding news panel when the screen size is smaller than lg
$("#news-button").on("click", function(){
    if($("#news-span").html()==="Show News"){
        $("#news-span").text("Hide News");
        $("#news-list-panel").slideDown();
        $("#news-list-panel").collapse();
    }
    else{
        $("#news-span").text("Show News");
        $("#news-list-panel").slideUp();
        $("#news-list-panel").collapse();
    }
});

// Function for resizing the width of the news panel with changing screen width.
$(window).resize(function () {
    $('#news').width($('#news-col').width()-22);
}).resize();

// Automatically hide nav-bar when scrolling down.
var prevScrollpos = window.pageYOffset;
window.onscroll=function(){
    var currentScrollPos = window.pageYOffset;
    if ($(window).width() >= 992){
        if (prevScrollpos > currentScrollPos){
            $("#navbar").css("top","0px");
            $("#news").css("top","80px");
        }
        else{
            $("#navbar").css("top","-60px");
            $("#news").css("top","20px");
        }
    }
    prevScrollpos = currentScrollPos;
    $("#navbarSupportedContent").slideUp();
    $("#navbarSupportedContent").collapse('hide');
};

$("#navbar-toggler").on("click", function(){
    if($("#navbarSupportedContent").hasClass('show')){
        $("#navbarSupportedContent").slideUp();
        $("#navbarSupportedContent").collapse();
    }
    else{
        $("#navbarSupportedContent").slideDown();
        $("#navbarSupportedContent").collapse();
    }
});

//Function to reload high resolution images to replace the compressed one when all resources loaded completely,
//aiming to reduce loading time at the client end.
window.onload = function(){
//    var test = /-min\./;
//    $("img").each(function(index,obj){
//        if(test.test($(this).attr("src"))){
//            var reSrc = $(this).attr("src").replace(test,".");
//            $(this).attr("src",reSrc)
//        }
//    });
    $('#news').width($('#news-col').width()-22);
};

