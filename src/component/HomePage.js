import React, { Component } from 'react'
import '../assets/homepage.css'
import {showDetail} from '../redux/action'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
export class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            apps: [],
            appDetail:{}

          };
          this.numFormatter=this.numFormatter.bind(this);
          this.pageDetail=this.pageDetail.bind(this);
    }
    numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        }else if(num > 1000000){
            return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        }else if(num < 900){
            return num; // if value < 1000, nothing to do
        }
    }
    pageDetail(id){
        this.props.showDetail({showDetail:true,id:id})

    }
     async componentDidMount() {
        await Promise.all([fetch("https://api.npoint.io/adf6676a313fa01f787d"),fetch("https://api.npoint.io/d734975d2aee62d197ef"),
        ])
        .then(async ([result1,result2])=>{
            const a= await result1.json();
            const b= await result2.json();
            return [a,b]
           }
        ).then((res)=>{
                console.log(res)
                this.setState({
                    isLoaded: true,
                    apps: res[0],
                    appDetail:res[1],
                    });
                    this.props.details(res[0])
            },(error)=>{
                this.setState({
                    isLoaded: true,
                    error:error
                    });
            })
        

        // await fetch("https://api.npoint.io/54d09df281f91e8c146f")
        //   .then(res => res.json())
        //   .then(
        //     (result) => {
        //         console.log(result)
        //       this.setState({
        //         isLoaded: true,
        //         items: result
        //       });
        //     },
        //     (error) => {
        //       this.setState({
        //         isLoaded: true,
        //         error
        //       });
        //     }
        //   )
      }
    render() {
        console.log("homepage")
        const { error, isLoaded, apps, appDetail} = this.state;
        return (
            <div className="dashboard">
                <div className="left">
                    <div className='top'>
                        <header>ADSOUL</header>
                        <div className="asset1">
                            <img src={process.env.PUBLIC_URL+"./assets/asset1.svg"} alt='asset1'/>
                        </div>
                    </div>
                    <div className='bottom'>
                        <header>Revenue Optimization</header>
                        <div className="grid">
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon1.svg"} alt='icon1'/>
                                <div>Fill Rate</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon2.svg"} alt='icon2'/>
                                <div>Improve CTR</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon3.svg"} alt='icon3'/>
                                <div>Refresh Rate</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon4.svg"} alt='icon4'/>
                                <div>Quick Integration</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <header>
                        <div>Apps</div>
                        <img src={process.env.PUBLIC_URL+"./assets/settings.png"} alt='settings'/>
                    </header>
                    <div className="apps">
                        {(()=>{
                            if (error) {
                                return <div>Error: {error.message}</div>;
                              } else if (!isLoaded) {
                                return <div>Loading...</div>;
                              } else {
                                  console.log("apps")
                                return (
                                    apps.map((app,i)=>{
                                        const detail=appDetail[i+1];
                                        
                                    return(
                                    <div className='app' key={i}>
                                        <div className="top">
                                            <div className='top-left'>
                                                <div className="appicon"></div>
                                                <div>
                                                <div className="appname">{app.appName}</div>
                                                <div className="pubname">{app.publisherName}</div>
                                                </div>
                                            </div>
                                            {/* <img src={process.env.PUBLIC_URL+"./assets/right-arrow.png"} onClick={this.pageDetail.bind(this,app.id)}/> */}
                                            <Link push to={{pathname: '/appdetails',search:`${app.id}`,state: {...app}}}>
                                                <img src={process.env.PUBLIC_URL+"./assets/right-arrow.png"} alt='right-arrow'/>
                                            </Link>
                                        </div>
                                        <div className='bottom'>
                                            <div>
                                                <div className='title'>Revenue</div>
                                                <div className='value'>{'$'+this.numFormatter(detail[0]['revenue'])}</div>
                                            </div>
                                            <div>
                                                <div className='title'>AdRequest</div>
                                                <div className='value'>{this.numFormatter(detail[0]['adRequest'])}</div>
                                            </div>
                                            <div>
                                                <div className='title'>AdResponse</div>
                                                <div className='value'>{this.numFormatter(detail[0]['adResponse'])}</div>
                                            </div>
                                            <div>
                                                <div className='title'>Impression</div>
                                                <div className='value'>{this.numFormatter(detail[0]['impressions'])}</div>
                                            </div>
                                        </div>
                                    </div>);
                                     })
                                );
                              } 
                        })()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        details: (y) => {
          dispatch(showDetail(y));
        },
      };
}
export default connect(null,mapDispatchToProps)(HomePage);
