import React, { Component } from "react";

import "./historyContent.scss";
import Icon from '../small/Icon';
import Axios from "axios";
import Config from '../../lib/Config';
type Props = {

};
type State = { 
    results: any,
    minPage:number,
    maxPage:number,
    searchPage:number,
 };

var timeArr:any = []
// eslint-disable-next-line
var min = 3600;
for (var i = 0, j = 1; i < 24; i++, j++) {
    timeArr.push({'minTime': min * i, 'maxTime': min * j - 1});
}

export default class HistoryContent extends Component<Props, State> {
    state = {
        results: [
            {
                code:'',
                date:'',
                issue:0,
                issue_time:'',
                name:'',
                _id:''
            }
        ],
        minPage:1,
        maxPage:12,
        searchPage:1,
    }
    UrlData:any = {
        startTime:0,
        endTime:0
    }

    async getResults(startTime:number,endTime:number,page:number,limit:number){
        
        let loginURL = `https://backend.monacolot.com/monaco5230s?start=${startTime}&end=${endTime}&page=${page}&limit=${limit}&name=MONACO5230S`;
        let response = await Axios.get(loginURL, { timeout: 6000}).catch(error => {
            console.log(error)
        });
        
        return response;
    }
    async componentDidMount(){
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response :any = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,this.state.searchPage,10);
        this.setState({
            results:response.data,
        })
    }
    
   async pageUp(){
       let searchData = this.state.searchPage >1 ?this.state.searchPage - 1 :1;
        this.setState({
            searchPage:searchData
           })
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response :any = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,searchData,10);
        this.setState({
            results:response.data,
        })
   }
    async  pageDown(){
        if(!this.state.results) return
        let searchData = this.state.results.length === 10 ? this.state.searchPage + 1 :this.state.searchPage
        this.setState({
            searchPage :searchData
        })
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response:any  = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,searchData,10);
        this.setState({
            results:response.data,
        })
    }
    toindex(){
        window.location.hash =`/`
    }
    render() {
        return <div className='history-content'>
                <div className='history-body'>
                    <div className='body-left'>
                        <Icon src ={require('../../../assets/Index/fdjsao.png')} className='left-icon'/>
                        <div className='left-tip' onClick={()=>this.toindex()}>
                            <div className='jiantou'/>
                            <span>monacoSuper52</span>
                        </div>
                        <div className='left-paper1'>
                            <Icon src ={require('../../../assets/Index/app-bg2.jpg')} className='paper-icon'/>
                        </div>
                    </div>
                    <div className='body-content'> 
                    <div className="content-box3">
                                <p className="content-box3-title"><span>numéro du tirage</span><span>boules</span></p>
                                {
                                    this.state.results?(
                                        this.state.results.map((item, index) => {
                                            let code = item.code.split(',');
                                                return <div key={index} className="content-box3-list">
                                                <span>{item.date}-{item.issue}</span>
                                                <div>
                                                    <ul>
                                                        {
                                                            code.map((item, index) => {
                                                                return <li key={index}
                                                                           style={{backgroundImage:`url(${require('../../../assets/Index/ball.png')})`}}>
                                                                    <span>{item}</span>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            })
                                    ):''
                                }
                                <p className='content-box3-page'>
                                    <span  className='pageUp' style={{backgroundImage:`url(${require('../../../assets/Index/pageUp.png')})`}}
                                           onClick={ ()=>this.pageUp()}
                                    ></span>
                                    <span className='minPage'></span>
                                    <span className='maxPage'></span>
                                    <span className='pageDown' style={{backgroundImage: `url(${require('../../../assets/Index/pageDown.png')})`}}
                                        onClick={()=>this.pageDown()}
                                    ></span></p>
                            </div>
                    </div>
                    <div className='body-right'>
                        <div className='right-paper1'>
                            <Icon src ={require('../../../assets/Index/app-bg.jpg')} className='paper-icon'/>
                        </div>
                    </div>
                    
                </div>
                               
        </div>
    }
}
