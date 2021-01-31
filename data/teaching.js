function loadTeachingExperience(){
    $.getJSON("data/teaching.json", function (data) {
        $.each(data, function (index, item) {
            item_code = generateTeachingItem(item);
            switch(item.institution){
                case("UTAS"):
                    $("#teaching_UTAS").append(item_code);
                    break;
                case("AUT"):
                    $("#teaching_AUT").append(item_code);
                    break;
                default:
                    break;
            }
        });
    });
}

function generateTeachingItem(item){
    var str = "<li>"+item.course+", "+item.time+".</li>";
    return str;
}

$(function(){
    loadTeachingExperience();
})

