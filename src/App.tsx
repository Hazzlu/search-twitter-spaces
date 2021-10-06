import "./styles.css";
import searchImg from "./img/search.png";
import React　from "react";
import Spaceinf from "./Spaceinf";
import SystemMessage from "./SystemMessage";


export default class App extends React.Component {
  
  state = {
          code: "beginning",
          radio: "update",
          textValue: "",
          creator_id: [],
          id: [],
          participant_count: [],
          title: [],
          updated_at: [],
          updated_at_dt: [new Date()],
          twname: [],
          username: [],
          profile_image_url: [],
          resultcount: 0,
          interval: 5,
          bool: true};

  setSpaceinf() {
    let inf: Spaceinf = {
      creator_id: this.state.creator_id,
      id: this.state.id,
      participant_count: this.state.participant_count,
      title: this.state.title,
      updated_at: this.state.updated_at,
      updated_at_dt: this.state.updated_at_dt,
      twname: this.state.twname,
      username: this.state.username,
      profile_image_url: this.state.profile_image_url,
      resultcount: this.state.resultcount
    };
    return inf;
  }
  

  keyDown(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onClick();
    }
  }

  async onClick() {
    this.setState({
      code: "loading"
    })
    if(this.state.interval >= 5) {
      this.setState({interval: 0});
      this.coolTime();
      const apiUrl = "https://search-spaces-api.herokuapp.com/api/twitter?text=" + this.state.textValue;
        await fetch(apiUrl,{ mode: 'cors' })
            .then((response) => {
                return response.json();     
            })
            .then((result) => {
              console.log(result)
              if(result.meta == 0){
                this.setState({
                  code: "no result",
                  bool: false
                })
              }else {
                this.setState({
                  creator_id: result.creator_id,
                  id: result.id,
                  participant_count: result.participant_count,
                  title: result.title,
                  updated_at: result.updated_at,
                  twname: result.name,
                  username: result.username,
                  profile_image_url: result.profile_image_url,
                  resultcount: result.meta,
                  bool: true
                })  
              }
                          

            })
            .catch(error => {
              console.log('error', error);
              this.setState({
                code: "error",
                bool: false
              })
          });
      
      if(this.state.bool) {
        this.dateChange();
        this.sortswitch(this.state.radio);
      }
      
    }
    
  }


  coolTime() {
    let cool = setInterval(() => {
      this.setState({interval: this.state.interval + 1})
      if(this.state.interval >= 5) {
        clearInterval(cool);
      }
     }, 1000);
  }

  dateChange() {
   
    if(this.state.resultcount != 0){
      var resultDate = [];
      var dateInf = [];
      for(let i = 0; i < this.state.updated_at.length; i++){
        var ts = Date.parse(this.state.updated_at[i]);
        resultDate.push(new Date(ts + (9 * 60 * 60)));
        dateInf.push(
          resultDate[i].getFullYear() + "/" +  (resultDate[i].getMonth() + 1 )+ "/"+ resultDate[i].getDate()
          + " " + resultDate[i].getHours() +  ":" + resultDate[i].getMinutes());
      }
      this.setState({
        updated_at: dateInf,
        updated_at_dt: resultDate
      }); 
    }
  }
  
  
  sortswitch(radioText : string) {
    if(this.state.resultcount == 0){
      this.setState({
        radio: radioText
      });
    }else { 
      console.log("sort change")
      this.setState({
        code: radioText,
        radio: radioText
      });
  
    }
    
  }


  
  render(){
    
    return (
      <div className="App">
        <h1 id = "title">Twitterスペース検索(β版)</h1>
        <div id="searchspace">
          <form id="search">
            <input
              type="text"
              placeholder="Type your search here"
              value={this.state.textValue}
              autoComplete="off"
              onChange={(e) => this.setState({textValue: e.target.value})}
              onKeyDown =  {(e) => this.keyDown(e)}
              id="textBox"
            ></input>
            <img src={searchImg}
              alt="search"
              id="searchButton"
              onClick={() => this.onClick()}
               />
          </form>
        </div>
        <tr></tr>
        <div id = "radioBox">
          <label><input 
            type="radio" 
            name="tag" 
            value="update" 
            checked={this.state.radio == "update"}
            onChange={(e) => this.sortswitch(e.target.value)}
          ></input>更新順</label>　
          <label><input 
            type="radio" 
            name="tag" 
            value="number"
            checked={this.state.radio == "number"}
            onChange={(e) => this.sortswitch(e.target.value)}
          ></input>ルーム人数順</label>
        </div>
        {SystemMessage(this.state.code, this.setSpaceinf())}
        <div>
        </div>
      </div>
    );
  }
}


