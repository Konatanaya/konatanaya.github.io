var journals = [
    {
        "title":"Greencommute: An Influence-aware Persuasive Recommendation Approach for Public-friendly Commute Options",
        "author": ["Shiqing Wu", "Quan Bai, and Sotsay Sengvong"],
        "booktitle":"Journal of Systems Science and Systems Engineering",
        "year":"2018",
        "note":"",
        "pdf":"",
        "bibtex":""
    },

]

var conferences = [
    {
        "title":"Learning Policies for Effective Incentive Allocation in Unknown Social Networks",
        "author":["Shiqing Wu", "Quan Bai, and Weihua Li"],
        "booktitle":"Proceedings of the 20th International Conference on Autonomous Agents and MultiAgent Systems (AAMAS)",
        "year":"2021",
        "note":"",
        "pdf":"",
        "bibtex":""
    },
    {
        "title":"Incentivizing Long-term Engagement Under Limited Budget",
        "author":["Shiqing Wu", "and Quan Bai"],
        "booktitle":"PRICAI 2019: Trends in Artificial Intelligence (PRICAI)",
        "year":"2019",
        "note":"",
        "pdf":"",
        "bibtex":""
    },
    {
        "title":"Adaptive Incentive Allocation for Influence-aware Proactive Recommendation",
        "author":["Shiqing Wu", "Quan Bai, and Byeong Ho Kang"],
        "booktitle":"PRICAI 2019: Trends in Artificial Intelligence (PRICAI)",
        "year":"2019",
        "note":"",
        "pdf":"",
        "bibtex":""
    },
]

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

function generatePublicationList(list, type){
    var length = list.length;
    var str = "<dl class='row text-justify-left'>";
    for(var i=0 ;i<length;i++){
        var index = length-i;
        var item = list[i];
        var authors = getAuthors(item.author);
        str += "<dd class='col-sm-1'>["+type+index+"]</dd><dd class='col-sm-11'>"+authors+". "+item.title+
        ". <i>"+item.booktitle+"</i>, "+item.year+". <a href="+item.pdf+" target='_blank' class='btn btn-outline-light btn-xs disabled'>PDF</a> <a href="+
        item.bibtex+" target='_blank' class='btn btn-outline-light btn-xs disabled'>Bibtex</a></dd>";
    }
    str += "</dl>";
    return str;
}

$(document).ready(function(){
    var str = "<h3 class=\"section-title\">Publications</h3><h5 class='subsection-title'>Referred Journal Papers</h5>"+
    generatePublicationList(journals,'J')+
    "<h5 class='subsection-title'>Referred Conference Papers</h5>"+
    generatePublicationList(conferences, 'C');

    $('#publications').append(str);
})

