document.addEventListener('touchstart', function() {},false);

window.onload = function(){
    doneLoading();
    if($(window).width()<1400){
        $('#navbar-toggler').css('height', '80px');
    }
    $('#news').width($('#news-col').width()-30);
    $('.navbar').addClass('animate__animated animate__fadeInDown');
    $('.main-page').addClass('animate__animated animate__fadeIn');


    setTimeout(function(){
        $('body').css('overflow-y','auto');
        $('.loading').css('display','none');
    }, 3000);
}

$(document).ready(function(){
    $.each(load_content_functions, function(n, func){
        func();
    });
});

$('.nav-link').on("click", function(e) {
    var headerHeight = $("#navbar").height();
    var target = $(this).attr("href"); //Get the target
    var scrollToPosition = $(target).offset().top - headerHeight-20;
    $('html, body').stop().animate({ 'scrollTop': scrollToPosition}, 800);
});

function doneLoading(){
    var pause_time = 2000;
    stat = $('.loading h3');
    setTimeout(function(){
        $(stat).css('opacity','0');
    }, 500);
    setTimeout(function(){
        $(stat).css('opacity','1');
        stat.text("Enjoy Your Visit!");
    }, 1000);

    setTimeout(function(){
        $('.loading').css('opacity','0');
        $('#particles-js').css('opacity','1');
    }, pause_time);
}

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
                str += "<dd class='col-2 col-xxl-1 text-center'>["+type+index+"]</dd><dd class='col-10 col-xxl-11'>"+authors+". \""+item.title+
                "\". <em>"+item.booktitle+"</em>, "+item.year+". "+checkLink(item.pdf)+"<i class='fas fa-file-pdf text-color'></i></a> ";
            }
            return str;
        }
        function checkLink(link){
            if(link == ""){
                return "<a href='"+link+"' target='_blank' class='disabled'>";
            }
            else{
                return "<a href='"+link+"' target='_blank' class=''>";
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
        var arxiv = [];
        $.getJSON("data/publications.json", function (data) {
            $.each(data, function (index, item) {
                switch(item.type){
                    case("journal"):
                        journals.push(item);
                        break;
                    case("conference"):
                        conferences.push(item);
                        break;
                    case("arxiv"):
                        arxiv.push(item);
                    default:
                        break;
                }
            });
            $("#journal-list").append(generatePublicationList(journals,'J'));
            $('#conference-list').append(generatePublicationList(conferences, 'C'));
            $("#arxiv-list").append(generatePublicationList(arxiv, 'A'));
            if(arxiv.length==0){
                $("#arxiv-div").css("display","None");
            }
        });
    },
    function(){//talks
        function generateTeachingItem(item){
            var str = "<li><b>"+item.type+"</b>, "+item.description+", "+item.time+".</li>";
            return str;
        }
        $.getJSON("data/talks.json", function (data) {
            $.each(data, function (index, item) {
                item_code = generateTeachingItem(item);
                switch(item.category){
                    case("IT"):
                        $("#IT").append(item_code);
                        break;
                    case("GL"):
                        $("#GL").append(item_code);
                        break;
                    default:
                        break;
                }
            });
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
                    case("USQ"):
                        $("#teaching-USQ").append(item_code);
                        break;
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
        var str = "<li><b>"+item.role+"</b>, "+item.name+", "+item.year+".</li>";
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

$("#news-button").on("click", function(){
    if($("#news-span").html()==="Show News"){
        $("#news-span").text("Hide News");
    }
    else{
        $("#news-span").text("Show News");
    }
});

$(window).resize(function(){
    if($(window).width()<1400){
        $('#navbar-toggler').css('height', '80px');
    }
    $('#news').width($('#news-col').width()-30);

});

$(document).scroll(function() {
    var scroH = $(document).scrollTop();
    var window_width = $(window).width();

    if(scroH > 80){
        $('.navbar').css('height','60px');
        $('.nav-item a').css('font-size','18px');
        $("#news").css("top","80px");
        if($(window).width()<1400){
            $('#navbar-toggler').css('height', '60px');
        }
    }else {
        $('.navbar').css('height','80px');
        $('.nav-item a').css('font-size','20px');
        $("#news").css("top","100px");
        if($(window).width()<1400){
            $('#navbar-toggler').css('height', '80px');
        }
    }
    if(scroH >500){
        $('#go-top-btn').css("right", "20px");
    }
    else {
        $('#go-top-btn').css("right", "-50px");
    }
    $('.navbar-collapse').collapse('hide');
});

$('#go-top-btn').bind("click", function(e) {
    $('html, body').animate({scrollTop: 0}, 800);
//    e.preventDefault();
});


//$('[data-trigger="hover"]').popover()