function loadPublications(){
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
        $("#journalDIV").append(generatePublicationList(journals,'J'))
        $('#conferenceDIV').append(generatePublicationList(conferences, 'C'));
    });
}

function generatePublicationList(list, type){
    var length = list.length;
    var str = "<dl class='row text-justify-left'>";
    for(var i=0 ;i<length;i++){
        var index = length-i;
        var item = list[i];
        var authors = getAuthors(item.author);
        str += "<dd class='col-sm-1'>["+type+index+"]</dd><dd class='col-sm-11'>"+authors+". "+item.title+
        ". <em>"+item.booktitle+"</em>, "+item.year+". <a href='"+item.pdf+"' target='_blank' class='btn btn-outline-light btn-xs disabled'>PDF</a> <a href='"+
        item.bibtex+"' target='_blank' class='btn btn-outline-light btn-xs disabled'>Bibtex</a></dd>";
    }
    str += "</dl>";
    return str;
}

function getAuthors(author_list){
    var a_length = author_list.length;
    var str = "";
    for(var i=0; i<a_length;i++){
        a = author_list[i];
        if (i==a_length-1){
            if (a=="Shiqing Wu"){
                str += "<b>"+a+"</b>)";
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

$(function(){
    loadPublications();
})

