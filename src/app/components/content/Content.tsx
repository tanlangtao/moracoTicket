import React, { Component } from "react";

import "./content.scss";
import Index from "../../pages/index/Index";
import Icon from '../small/Icon';
import Axios from "axios";
import Socket from "lows";
import Config from '../../lib/Config';
import History from '../../pages/history/History';
type Props = {
    app: Index|History;
};
type State = { 
    after_second: number,
    results:any,
    selectYear:number,
    selectMonth:number,
    selectDay:number,
    selectTime:any,
    minPage:number,
    maxPage:number,
    searchPage:number
    visible:boolean,
    code:any
 };
var myDate = new Date();
var nowYear = myDate.getFullYear();
var nowMonth = myDate.getMonth() + 1;
var nowDay = myDate.getDate();
var nowHour = myDate.getHours();
var dateResults = Config.creatDate(nowYear);


var timeArr:any = []
// eslint-disable-next-line
var min = 3600;
for (var i = 0, j = 1; i < 24; i++, j++) {
    timeArr.push({'minTime': min * i, 'maxTime': min * j - 1});
}

export default class Content extends Component<Props, State> {
    state = {
        after_second:30-((Date.now()/1000)>>0)%30
        ,
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
        selectYear: 0,
        selectMonth: 0,
        selectDay: 0,
        selectTime: ['0','3599'],
        minPage:1,
        maxPage:2,
        searchPage:1,
        visible:false,
        code:[]
    }
    timer:any
    async componentDidMount() {
        let endTime = Math.floor(new Date().getTime()/1000);
        let startTime = endTime - 300;
        let response = await this.getResults(startTime,endTime,1,10);
        let socket = new Socket({
            host: "https://backend.monacolot.com",
            port: '',
            path: "/lotteryWebServer"
        });
        
        socket.addListener("lottery-begin", (e:any, data:any) => {
            this.setState({
                after_second:data.after_second
            })
        });
        
        socket.addListener("lottery-open", (e:any, data:any) => {
            let newresults = this.state.results;
            newresults.pop();
            newresults.unshift(data);
            this.setState({
                results:newresults,
                code:data.code.split(',')
            })
        });
        socket.start();
        this.setState({
            selectYear: nowYear,
            selectMonth: nowMonth,
            selectDay: nowDay,
            results:response.data,
            code:response.data[0].code.split(',')
        })
        
        //定时器
        this.timer = setInterval(() => {
            this.setState({
                after_second: (this.state.after_second - 1) <=0 ? 0 :this.state.after_second - 1
            })
        }, 1000)
        const {results} = this.state;
        if (!results) {
            return null;
        }
    }
    async getResults(startTime:number,endTime:number,page:number,limit:number){
        
        let loginURL = `https://backend.monacolot.com/monaco5230s?start=${startTime}&end=${endTime}&page=${page}&limit=${limit}&name=MONACO5230S`;
        let response:any = await Axios.get(loginURL, { timeout: 6000}).catch(error => {
            console.log(error)
        });
        
        return response;
    }
    async searchResults(){
       
        let min = `${this.state.selectYear}-${this.state.selectMonth}-${this.state.selectDay} ${Config.formatDuring(this.state.selectTime[0])}`.replace(/-/g,'/');
        let startTime = Math.floor((new Date(min).getTime())/1000);
        let max = `${this.state.selectYear}-${this.state.selectMonth}-${this.state.selectDay} ${Config.formatDuring(this.state.selectTime[1])}`.replace(/-/g,'/');
        let endTime = Math.floor((new Date(max).getTime())/1000);
        document.getElementById('Rechercher')!.style.transform = 'scale(0.9)';
        if(myDate.getTime()/1000-startTime > 604800){
            alert('Désolé, Vous ne pouvez pas rechercher les données plus de 7 jours.')
        }else{
            window.location.hash =`History?startTime=${startTime}&endTime=${endTime}`
        }
       
    }
    componentWillUpdate(a:any, b:any) {
        // 年月日联动的判断
        
       // eslint-disable-next-line
        if (b.selectYear == nowYear) {
            var month = []
            for (var i = 1; i <= nowMonth; i++) {
                month.push(i)
            }
            dateResults.month = month;
            // eslint-disable-next-line
            if (b.selectMonth == nowMonth && b.selectDay == nowDay) {
                timeArr = []
                // eslint-disable-next-line
                for (var i = 0, j = 1; i <= nowHour; i++, j++) {
                    timeArr.push({'minTime': min * i, 'maxTime': min * j-1})
                }
            } else {
                timeArr = []
                // eslint-disable-next-line
                for (var i = 0, j = 1; i < 24; i++, j++) {
                    timeArr.push({'minTime': min * i, 'maxTime': min * j-1})
                }
            }
        } else {
            // eslint-disable-next-line
            var month = []
            // eslint-disable-next-line
            for (var j = 1; j <= 12; j++) {
                month.push(j)
            }
            dateResults.month = month
        }
        // eslint-disable-next-line
        if (b.selectMonth == nowMonth && b.selectYear == nowYear) {
            var days = []
            for (var x = 1; x <= nowDay; x++) {
                days.push(x)
            }
            dateResults.days = days
        } else if (b.selectMonth === 2) {
            //如果是闰年
            if ((b.selectYear % 4 === 0 && b.selectYear % 100 !== 0) || b.selectYear % 400 === 0) {
                days = []
                for (i = 1; i <= 29; i++) {
                    days.push(i)
                }
                dateResults.days = days
                //如果是平年
            } else {
                days = []
                for (i = 1; i <= 28; i++) {
                    days.push(i)
                }
                dateResults.days = days
            }
        } else if (b.selectMonth === 4 || b.selectMonth === 6 || b.selectMonth === 9 || b.selectMonth === 11) {
            days = []
            for (i = 1; i <= 30; i++) {
                days.push(i)
            }
            dateResults.days = days
        } else {
            days = []
            for (i = 1; i <= 31; i++) {
                days.push(i)
            }
            dateResults.days = days
        }
        // eslint-disable-next-line
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        this.setState = (state, callback) => {
            return;
        };
        
    }
    shouldComponentUpdate(){
        if(!this.state.results){
            return false;
        }else{
            return true;
        }
    }
    toindex(){
        window.location.hash =`/`
    }
    render() {
        var results = this.state.results;
        return <div className='content'>
                <div className='content-body'>
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
                        <div className='content-box1'>
                            <h2 className='content-box1-font'>Résultats des tirages</h2>
                            <div className='content-box1-box'>
                                <p className="box-row1">{results?results[0].issue_time :''}</p>
                                <div className="box-row2">
                                    <ul>
                                        {
                                            results?this.state.code.map((item:any, index:any) => {
                                                return <li key={index}
                                                            style={{backgroundImage: `url(${require('../../../assets/Index/ball.png')})`}}>
                                                    <span>{item}</span></li>
                                            }):""
                                        }
                                    </ul>
                                </div>
                                <div className="box-row3"
                                    style={{backgroundImage: `url(${require('../../../assets/Index/subtle-bg-small.png')})`}}
                                >
                                    <span className='box-row3-span'>le prochain tirage</span>
                                    <div className='box-row3-div'>
                                        <span>Temps restant</span>
                                        <ul>
                                            <li>
                                                <span>00</span>
                                                <span>heures</span>
                                            </li>
                                            <li>
                                                <span>00</span>
                                                <span>mins</span>
                                            </li>
                                            <li>
                                                <span>{this.state.after_second >= 10 ? this.state.after_second : '0' + this.state.after_second}</span>
                                                <span>secs</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className='content-box2'>
                            <h2 className="content-box2-font">Résultats des tirages précédents</h2> 
                            <div className='content-box2-box'>
                                <span>Date:</span>
                                <select name="sel1" id="sel1"
                                        onChange={(e) => {
                                            this.setState({
                                                selectYear: Number(e.target.value),
                                                selectMonth: 1,
                                                selectDay: 1
                                            })
                                        }}
                                        value={this.state.selectYear}
                                >
                                    {dateResults.year.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                                    <select name="sel2" id="sel2"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectMonth: Number(e.target.value),
                                                })

                                            }}
                                            value={this.state.selectMonth}
                                    >
                                        {dateResults.month.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    <select name="sel3" id="sel3"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectDay:Number( e.target.value)
                                                })
                                            }}
                                            value={this.state.selectDay}
                                    >
                                        {dateResults.days.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    <span>Time:</span>
                                    <select name="" id="selectYear"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectTime: e.target.value.split(",")
                                                })
                                            }}
                                    >
                                        {
                                            timeArr.map((item:any, index:any) => {
                                                return <option key={index}
                                                                value={item.minTime + ',' + item.maxTime}>{Config.formatDuring(item.minTime) + '-' + Config.formatDuring(item.maxTime)}</option>
                                            })
                                        }
                                    </select>
                                    <div id="Rechercher"
                                            onMouseDown={() => this.searchResults()}
                                            onMouseUp={() => {
                                                document.getElementById('Rechercher')!.style.transform = 'scale(1)'
                                            }}
                                    >Rechercher
                                    </div>
                                </div>
                            </div>
                            <div className="content-box3">
                                <p className="content-box3-title"><span>numéro du tirage</span><span>boules</span></p>
                                {
                                    this.state.results?(
                                        // eslint-disable-next-line
                                        this.state.minPage==1?this.state.results.slice(0,10).map((item, index) => {
                                            let code = item.code.split(',');
                                                return <div key={index} className="content-box3-list">
                                                <span>{item.date}-{item.issue}</span>
                                                <div>
                                                    <ul>
                                                        {
                                                            code.map((item, index) => {
                                                                return <li key={index}
                                                                           style={{backgroundImage: `url(${require('../../../assets/Index/ball.png')})`}}>
                                                                    <span>{item}</span>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            }):this.state.results.slice(10).map((item, index) => {
                                                let code = item.code.split(',');
                                                    return <div key={index} className="content-box3-list">
                                                    <span>{item.issue_time}</span>
                                                    <div>
                                                        <ul>
                                                            {
                                                                code.map((item, index) => {
                                                                    return <li key={index}
                                                                               style={{backgroundImage: `url(${require('../../../assets/Index/ball.png')})`}}>
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
