function loadServicesExperience(){
    $.getJSON("data/services.json", function (data) {
        $.each(data, function (index, item) {
            item_code = generateServiceItem(item);
            switch(item.type){
                case("journal"):
                    $("#services_journal").append(item_code);
                    break;
                case("conference"):
                    $("#services_conference").append(item_code);
                    break;
                default:
                    break;
            }
        });
    });
}

function generateServiceItem(item){
    var str = "<li>"+item.role+", "+item.name+", "+item.year+".</li>";
    return str;
}

$(function(){
    loadServicesExperience();
})

