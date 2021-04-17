import React, { Component } from 'react'
import '../assets/homepage.css'
export class HomePage extends Component {
    render() {
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
                    <header></header>
                    <div className="apps"></div>
                </div>
            </div>
        )
    }
}

export default HomePage;
