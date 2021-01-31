function loadAwards(){
    $.getJSON("data/awards.json", function (data) {
        $.each(data, function (index, item) {
            item_code = generateAwardsItem(item);
            $("#awards_list").append(item_code);
        });
    });
}

function generateAwardsItem(item){
    var str = "<li>"+item.item+", "+item.organization+", "+item.year+".</li>";
    return str;
}

$(function(){
    loadAwards();
})

