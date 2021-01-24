class Home extends React.Component{
    render(){
        return(
          <div class="row text-center">
            <div class="col-sm-3">
            <img src="files/photo.jpg" class="img-thumbnail" alt="..."></img>
            </div>
            <div class="col-sm-8">col</div>
          </div>
        )
    }
}
class Bio extends React.Component{
    render(){
        return(
          <p>Shiqing is currently a doctoral candidate in the Discipline of Information and Communication Technology, College of Sciences and Engineering, University of Tasmania. His research interests involve incentive allocation problem, influence diffusion analysis, agent-based modeling, and machine learning.</p>
        )
    }
}

ReactDOM.render(
  <Home />,
  document.getElementById('home')
);
