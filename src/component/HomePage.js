import React, { Component } from 'react'
import '../assets/homepage.css'
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
     async componentDidMount() {
        await Promise.all([fetch("https://api.npoint.io/4ca5aaf459a573940672"),fetch("https://api.npoint.io/d734975d2aee62d197ef"),
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
        const { error, isLoaded, apps, } = this.state;
        return (
            <div className="dashboard">
                <div className="left">
                    <div className='top'>
                        <header>ADSOUL</header>
                        <div className="asset1">
                            <img src={process.env.PUBLIC_URL+"./assets/asset1.svg"}/>
                        </div>
                    </div>
                    <div className='bottom'>
                        <header>Revenue Optimization</header>
                        <div className="grid">
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon1.svg"}/>
                                <div>Fill Rate</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon2.svg"}/>
                                <div>Improve CTR</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon3.svg"}/>
                                <div>Refresh Rate</div>
                            </div>
                            <div className="item">
                                <img src={process.env.PUBLIC_URL+"./assets/icon4.svg"}/>
                                <div>Quick Integration</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <header>
                        <div>Apps</div>
                        <img src={process.env.PUBLIC_URL+"./assets/settings.png"}/>
                    </header>
                    <div className="apps">
                        {(()=>{
                            if (error) {
                                return <div>Error: {error.message}</div>;
                              } else if (!isLoaded) {
                                return <div>Loading...</div>;
                              } else {
                                return (
                                    apps.map((app,i)=>{
                                        const detail=this.state.appDetail[i+1];
                                        
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
                                            <img src={process.env.PUBLIC_URL+"./assets/right-arrow.png"}/>
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

export default HomePage;
