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
    }
    else{
        $("#news-span").text("Show News");
    }
});

// Function for resizing the width of the news panel with changing screen width.
$(window).resize(function () {
    $('#news').width($('#news-col').width()-20);
}).resize();

//Function to reload high resolution images to replace the compressed one when all resources loaded completely,
//aiming to reduce loading time at the client end.
window.onload = function(){
    var test = /-min\./;
    $("img").each(function(index,obj){
        if(test.test($(this).attr("src"))){
            var reSrc = $(this).attr("src").replace(test,".");
            $(this).attr("src",reSrc)
        }
    });
}

// Effect of pre-loading bar
(function(){
  function id(v){ return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0,
        tot = img.length;
    if(tot == 0) return doneLoading();

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      stat.innerHTML = "Loading "+ perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      ovrl.style.opacity = 0;
      setTimeout(function(){
        ovrl.style.display = "none";
      }, 1200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());