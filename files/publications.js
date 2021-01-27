var journals = [
    {
        "title":"Greencommute: An Influence-aware Persuasive Recommendation Approach for Public-friendly Commute Options",
        "author": ["Shiqing Wu", "Quan Bai, and Sotsay Sengvong"],
        "booktitle":"Journal of Systems Science and Systems Engineering",
        "year":"2018",
        "note":"SJR:Q2",
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
        "pdf":"https://www.baidu.com",
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

//class Publications extends React.Component{
//    generateJournals(){
//        let j_length = journals.length;
//        return(
//            <dl class="row text-justify-left">{
//                journals.map((item, index) => {
//                    var i = j_length-index;
//                    var a_length = item.author.length
//                    var authors = item.author.map((a,k)=>{
//                        var str=[];
//                        if (k==a_length-1){
//                            if (a=="Shiqing Wu"){
//                                str.push(<b key={index+"_"+k}>{a}</b>)
//                            }
//                            else{
//                                str.push(<span key={index+"_"+k}>{a}</span>)
//                            }
//                        }
//                        else if (k<a_length-1){
//                            if (a=="Shiqing Wu"){
//                                str.push(<span><b key={index+"_"+k}>{a}</b>, </span>)
//                            }
//                            else{
//                                str.push(<span key={index+"_"+k}>{a}, </span>)
//                            }
//                        }
//                        return(
//                            str
//                        )
//                    })
//                    return (
//                        [<dd key={'j'+i} class="col-sm-1">[J{i}]</dd>,
//                        <dd key={'J'+i} class="col-sm-11">{authors}. {item.title}. <i>{item.publisher}</i>, {item.year}. <a href={item.pdf} target="_blank" class="btn
//                        btn-outline-light btn-xs disabled">PDF</a> <a href="{item.bibtex}" target="_blank" class="btn btn-outline-light
//                        btn-xs disabled">Bibtex</a></dd>]
//                    )
//                })
//            }
//          </dl>
//        )
//    }
//
//    generateConferences(){
//        let c_length = conferences.length;
//        return(
//            <dl class="row text-justify-left">{
//                conferences.map((item, index) => {
//                    var i = c_length-index;
//                    var a_length = item.author.length
//                    var authors = item.author.map((a,k)=>{
//                        var str=[];
//                        if (k==a_length-1){
//                            if (a=="Shiqing Wu"){
//                                str.push(<b key={index+"_"+k}>{a}</b>)
//                            }
//                            else{
//                                str.push(<span key={index+"_"+k}>{a}</span>)
//                            }
//                        }
//                        else if (k<a_length-1){
//                            if (a=="Shiqing Wu"){
//                                str.push(<span><b key={index+"_"+k}>{a}</b>, </span>)
//                            }
//                            else{
//                                str.push(<span key={index+"_"+k}>{a}, </span>)
//                            }
//                        }
//                        return(
//                            str
//                        )
//                    })
//                    return (
//                        [<dd key={'C'+i} class="col-sm-1">[C{i}]</dd>,
//                        <dd key={'C'+i} class="col-sm-11">{authors}. {item.title}. In: <i>{item.proceeding}</i>, {item.year}. <a href={item.pdf} target="_blank" class="btn
//                        btn-outline-light btn-xs disabled">PDF</a> <a href="{item.bibtex}" target="_blank" class="btn btn-outline-light
//                        btn-xs disabled">Bibtex</a></dd>]
//                    )
//                })
//            }
//          </dl>
//        )
//    }
//
//    render(){
//        return(
//            <div>
//                <h3 class="section-title">Publications</h3>
//                <h5 class="subsection-title">Referred Journal Papers</h5>
//                {this.generateJournals()}
//                <h5 class="subsection-title">Referred Conference Papers</h5>
//                {this.generateConferences()}
//            </div>
//        )
//    }
//}
//
//ReactDOM.render(
//  <Publications />,
//  document.getElementById('publications')
//);

//ReactDOM.render(
//    str, document.getElementById('publications')
//)

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

