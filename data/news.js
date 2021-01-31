function loadNews(){
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
            $("#news_list").append(item_code)
        });
    });
}

function generateConferenceNews(item){
    var str = "<li><b>["+item.date+"]</b><br>" + item.content + "<b>"+item.conference+"</b>.</li><br>";
    return str;
}

function generateJournalNews(item){
    var str = "<li><b>["+item.date+"]</b><br>" + item.content + "<b>"+item.journal+"</b>.</li><br>";
    return str;
}

function generateWorkshopNews(item){
    var str = "<li><b>["+item.date+"]</b><br>" + item.content + "<b>"+item.workshop+"</b>.</li><br>";
    return str;
}

function generateNormalNews(item){
    var str = "<li><b>["+item.date+"]</b><br>" + item.content +"</li><br>";
    return str;
}

$(function(){
    loadNews();
})

