import React, { Component } from 'react'
import '../assets/pagedetail.css'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
export class AppDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            error: null,
            isLoaded: false,
            data:[],
        }
        this.renderRate=this.renderRate.bind(this)
    }
    renderRate(impression,adresponse){
      var renderrate=(impression/adresponse)*100;
      
      return renderrate.toFixed(2)+'%'
    }
    async componentDidMount(){
        const {id}=this.props.location.state
        await fetch(`https://api.npoint.io/baf8dba5974d29aa094b/${id}`)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              this.setState({
                isLoaded: true,
                data: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    render() {
        
        const {data,isLoaded,error}=this.state
        if(error){
        return <div>{error}</div>
        }else if(!isLoaded){
          return <div>Loading...</div>
        }else{
          const {appName,publisherName}=this.props.location.state
          return (
            <div className='container'>
              <header className='header'>ADSOUL</header>
              <div className='detail'>
                <div className='detail-title'>
                  <Link to='/'>
                    <img src={process.env.PUBLIC_URL+"./assets/left-arrow.png"} alt='left-arrow'/>
                  </Link>
                  <div className="appicon"></div>
                  <div>
                    <div className="appname">{appName}</div>
                    <div className="pubname">{publisherName}</div>
                  </div>
                </div>
                <div className='table-container'>
                <div className='table'>
                  <div className='heading-row' >
                    <div className='heading'>Date</div>
                    <div className='heading'>Revenue</div>
                    <div className='heading'>Ad Request</div>
                    <div className='heading'>Ad Response</div>
                    <div className='heading'>Impression</div>
                    <div className='heading'>Clicks</div>
                    <div className='heading'>Render Rate</div>
                  </div>
                  {data.map((obj,i)=>{
                    var renderrate=this.renderRate(obj['impressions'],obj['adResponse'])
                    return(
                      <div className='item-row' key={i}>
                        <div className='item'>{obj['date']}</div>
                        <div className='item'>{'$'+obj['revenue']}</div>
                        <div className='item'>{obj['adRequest']}</div>
                        <div className='item'>{obj['adResponse']}</div>
                        <div className='item'>{obj['impressions']}</div>
                        <div className='item'>{obj['clicks']}</div>
                        <div className='item'>{renderrate}</div>
                      </div>
                    )
                  })}
                </div>
                </div>
              </div>
                
            </div>
        )
    }
  }
}
// const mapStateToProps=(state)=>{
//   console.log('state',state)
//   return{
//     apps:state.apps
//   }
// }
export default AppDetails;
