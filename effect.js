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

$(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('div');

    for (var i = 0; i < anchors.length; i++){
        if (scrollTop > $(anchors[i]).offset().top -200 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 200) {
            $('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
        } else {
            $('nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
        }
    }
});

//$(document).ready(function () {
//
//    // Scroll spy
//    $('body').scrollspy({
//        target: "#navbar"
//    });
//
//    // Navbar fade
//    changeNavbar();
//
//    $(window).scroll(function () {
//        changeNavbar();
//    });
//
//    function changeNavbar() {
//        var navbar = $("#navbar");
//        if ($(this).scrollTop() >= 100) {
//            navbar.addClass("bg-light").removeClass("bg-transparent");
//        } else if ($(this).scrollTop() < 100) {
//            navbar.removeClass("bg-light").addClass("bg-transparent");
//        }
//    }
//});
