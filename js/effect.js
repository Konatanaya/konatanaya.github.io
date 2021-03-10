var load_content_functions = [
    function(){//news
        function generateConferenceNews(item){
            var str = "<li><b>["+item.date+"]</b><br>" + item.content + item.conference+".</li><br>";
            return str;
        }
        function generateJournalNews(item){
            var str = "<li><b>["+item.date+"]</b><br>" + item.content + item.journal+".</li><br>";
            return str;
        }
        function generateWorkshopNews(item){
            var str = "<li><b>["+item.date+"]</b><br>" + item.content + item.workshop+".</li><br>";
            return str;
        }
        function generateNormalNews(item){
            var str = "<li><b>["+item.date+"]</b><br>" + item.content +"</li><br>";
            return str;
        }
        $.getJSON("data/news.json", function (data) {
            $.each(data, function (index, item) {
                switch(item.type){
                    case("journal"):
                        item_code = generateJournalNews(item);
                        break;
                    case("conference"):
                        item_code = generateConferenceNews(item);
                        break;
                    case("workshop"):
                        item_code = generateWorkshopNews(item);
                        break;
                    case("normal"):
                        item_code = generateNormalNews(item);
                    default:
                        break;
                }
                $("#news-list").append(item_code)
            });
        });
    },
    function(){//publications
        function generatePublicationList(list, type){
            var length = list.length;
            var str = "";
            for(var i=0 ;i<length;i++){
                var index = length-i;
                var item = list[i];
                var authors = getAuthors(item.author);
                str += "<dd class='col-lg-1 col-2 pub-index'>["+type+index+"]</dd><dd class='col-lg-11 col-10'>"+authors+". \""+item.title+
                "\". <em>"+item.booktitle+"</em>, "+item.year+". <br>"+checkLink(item.pdf)+"PDF</a> "+
                 checkLink(item.bibtex)+"Bibtex</a></dd>";
            }
            return str;
        }
        function checkLink(link){
            if(link == ""){
                return "<a href='"+link+"' target='_blank' class='btn btn-outline-light btn-xs disabled'>";
            }
            else{
                return "<a href='"+link+"' target='_blank' class='btn btn-outline-light btn-xs'>";
            }
        }
        function getAuthors(author_list){
            var a_length = author_list.length;
            var str = "";
            for(var i=0; i<a_length;i++){
                a = author_list[i];
                if (i==a_length-1){
                    if (a=="Shiqing Wu"){
                        str += "<b>"+a+"</b>";
                    }
                    else{
                        str += a;
                    }
                }
                else if (i<a_length-1){
                    if (a=="Shiqing Wu"){
                        str += "<b>"+a+"</b>, ";
                    }
                    else{
                        str += a+", ";
                    }
                }
            }
            return str;
        }
        var journals = [];
        var conferences = [];
        $.getJSON("data/publications.json", function (data) {
            $.each(data, function (index, item) {
                switch(item.type){
                    case("journal"):
                        journals.push(item);
                        break;
                    case("conference"):
                        conferences.push(item);
                        break;
                    default:
                        break;
                }
            });
            $("#journal-list").append(generatePublicationList(journals,'J'))
            $('#conference-list').append(generatePublicationList(conferences, 'C'));
        });
    },
    function(){//teaching
        function generateTeachingItem(item){
            var str = "<li>"+item.course+", "+item.time+".</li>";
            return str;
        }
        $.getJSON("data/teaching.json", function (data) {
        $.each(data, function (index, item) {
            item_code = generateTeachingItem(item);
            switch(item.institution){
                case("UTAS"):
                    $("#teaching-UTAS").append(item_code);
                    break;
                case("AUT"):
                    $("#teaching-AUT").append(item_code);
                    break;
                default:
                    break;
            }
        });
    });
    },
    function(){//services
        function generateServiceItem(item){
        var str = "<li>"+item.role+", "+item.name+", "+item.year+".</li>";
        return str;
    }
        $.getJSON("data/services.json", function (data) {
        $.each(data, function (index, item) {
            item_code = generateServiceItem(item);
            switch(item.type){
                case("journal"):
                    $("#services-journal").append(item_code);
                    break;
                case("conference"):
                    $("#services-conference").append(item_code);
                    break;
                default:
                    break;
            }
        });
    });
    },
    function(){//awards
        function generateAwardsItem(item){
            var str = "<li>"+item.item+", "+item.organization+", "+item.year+".</li>";
            return str;
        }
        $.getJSON("data/awards.json", function (data) {
            $.each(data, function (index, item) {
                item_code = generateAwardsItem(item);
                $("#awards-list").append(item_code);
            });
        });
    }
]

function id(v){
    return document.getElementById(v);
}
// Effect of pre-loading bar
$(function(){
    function loadbar() {
        var ovrl = id("overlay"),
            prog = id("progress"),
            stat = id("progstat"),
            img = document.images,
            c = 0,
            tot = img.length + load_content_functions.length;
        if(tot == 0)
            return doneLoading();

        function imgLoaded(){
            c += 1;
            var perc = ((100/tot*c) << 0) +"%";
//            prog.style.width = perc;
            $(prog).animate({width:perc});
            stat.innerHTML = "Loading...";
            if(c===tot)
                return doneLoading();
        }
        function doneLoading(){
            var pause_time = 3800;

            setTimeout(function(){
                $(stat).fadeOut(800);
            }, 1200);
            setTimeout(function(){
                $(stat).fadeIn(800);
                stat.innerHTML = "Enjoy Your Visit!";
            }, 2000);

            setTimeout(function(){
                ovrl.style.opacity = 0;
            }, pause_time);
            setTimeout(function(){
                ovrl.style.display = "none";
            }, pause_time+1200);

        }

        var index_0 = 0;
        mytime_0 = setInterval(function(){
            load_content_functions[index_0]();
            imgLoaded();
            index_0 += 1;
            if(index_0 == load_content_functions.length)
                clearInterval(mytime_0);
        }, 300);

        var index_1 = 0;
        mytime_1 = setInterval(function(){
            $(img[index_1]).attr('src', $(img[index_1]).attr('data-src'));
            imgLoaded();
            index_1 += 1;
            if(index_1 == img.length)
                clearInterval(mytime_1);
        }, 300);
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
}());

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
    $('#news').width($('#news-col').width()-22);
}).resize();

// Automatically hide nav-bar when scrolling down.
var prevScrollpos = window.pageYOffset;
var news_height = $("#news").height();
window.onscroll=function(){
    var currentScrollPos = window.pageYOffset;
    var totalheight = parseFloat($(window).height()) + 30 + parseFloat($(window).scrollTop());
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
    $("#navbarSupportedContent").collapse('hide');
};



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

