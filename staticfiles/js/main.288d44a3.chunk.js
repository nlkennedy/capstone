(this["webpackJsonpscoring-app"]=this["webpackJsonpscoring-app"]||[]).push([[0],{44:function(e,t,a){},67:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),c=a(35),r=a.n(c),i=(a(44),a(2)),o=a(3),l=a(5),h=a(4),m=a(37),A=a(6),d=a(0),j=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsxs)("header",{children:[Object(d.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",integrity:"sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2",crossOrigin:"anonymous"}),Object(d.jsx)("script",{src:"https://code.jquery.com/jquery-3.5.1.slim.min.js",integrity:"sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",crossOrigin:"anonymous"}),Object(d.jsx)("script",{src:"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js",integrity:"sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx",crossOrigin:"anonymous"})]})}}]),a}(n.a.Component),u=a.p+"static/media/logo.8b4496ad.png",b=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsx)("nav",{className:"navbar navbar-custom",children:Object(d.jsxs)("a",{className:"navbar-brand navbar-text",href:"/",children:[Object(d.jsx)("img",{id:"logo",src:u,width:"50",height:"30",className:"d-inline-block align-top",alt:""}),"IntelliSquash"]})})}}]),a}(n.a.Component),p=a(15),O=a.n(p);a(63).config();var g=O.a.create({baseURL:"https://intellisquash.herokuapp.com/",xsrfCookieName:"csrftoken",xsrfHeaderName:"X-CSRFToken"}),x=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={team_matches:[]},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.get("api/teammatches-summary").then((function(t){var a=t.data.reverse();e.setState({team_matches:a})}))}},{key:"render",value:function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"wrap",children:Object(d.jsxs)("div",{id:"main",className:"container clear-top",style:{marginTop:"5%"},children:[Object(d.jsx)("div",{className:"justify-content-center",children:Object(d.jsx)("a",{className:"btn-custom btn btn-secondary btn-lg",href:"/create-matchup",role:"button",children:"New Team Matchup"})}),Object(d.jsxs)("div",{children:[Object(d.jsx)("h4",{style:{marginTop:"5%"},children:"Incomplete Team Matchups"}),Object(d.jsxs)("table",{className:"table table-hover table-striped",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{className:"w-40",scope:"col",children:"Home Team"}),Object(d.jsx)("th",{className:"w-40",scope:"col",children:"Away Team"}),Object(d.jsx)("th",{className:"w-20",scope:"col",children:"Date"})]})}),Object(d.jsx)("tbody",{children:this.state.team_matches.map((function(e,t){return!e.done&&Object(d.jsxs)("tr",{className:"hover",onClick:function(){return window.location="/matchup/"+e.pk},children:[Object(d.jsx)("td",{children:e.home_team_name}),Object(d.jsx)("td",{children:e.away_team_name}),Object(d.jsx)("td",{children:e.date_played})]},"teammatch-"+e.pk)}))})]})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("h4",{style:{marginTop:"5%"},children:"Completed Team Matchups"}),Object(d.jsxs)("table",{className:"table table-hover table-striped",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{className:"w-40",scope:"col",children:"Home Team"}),Object(d.jsx)("th",{className:"w-40",scope:"col",children:"Away Team"}),Object(d.jsx)("th",{className:"w-20",scope:"col",children:"Date"})]})}),Object(d.jsx)("tbody",{children:this.state.team_matches.map((function(e,t){return e.done&&Object(d.jsxs)("tr",{className:"hover",onClick:function(){return window.location="/matchup/"+e.pk},children:[Object(d.jsx)("td",{children:e.home_team_name}),Object(d.jsx)("td",{children:e.away_team_name}),Object(d.jsx)("td",{children:e.date_played})]},"teammatch-"+e.pk)}))})]})]})]})}),Object(d.jsx)("footer",{className:"footer",children:Object(d.jsx)("a",{className:"nav-link",href:"/about",children:"About"})})]})}}]),a}(n.a.Component),v=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"wrap",children:Object(d.jsxs)("div",{id:"main",className:"container",style:{marginTop:"5%"},children:[Object(d.jsx)("h1",{children:" About "}),Object(d.jsx)("p",{children:"This app is an auto referee hand signal detection and score keep app for the Tufts University Squash team."}),Object(d.jsx)("p",{children:"This app was built by Ben Bodine, Harsh Prajapati, Nicole Kennedy, and Radhika Joshi."}),Object(d.jsx)("p",{children:"About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us About us"})]})}),Object(d.jsx)("footer",{className:"footer",children:Object(d.jsx)("a",{className:"nav-link",href:"/",children:"Back to Home"})})]})}}]),a}(n.a.Component),y=a(17),f=a(22),N=a(8),w=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).handleSubmit=function(e){e.preventDefault();var t=/[^a-zA-Z0-9 ]/g;if(s.state.homeTeam.match(t)||s.state.awayTeam.match(t))alert("Only characters A-Z, a-z and 0-9, are allowed.");else{for(var a=0;a<9;a++){if(s.state.homePlayers[a].match(t)||s.state.awayPlayers[a].match(t))return void alert("Only characters A-Z, a-z and 0-9, are allowed.");if(!Number.isInteger(s.state.courts[a]))return alert("Court number must be an integer."),void(s.state.courts[a]=a+1)}for(var n=[],c=0;c<9;c++){var r={home_player:s.state.homePlayers[c],away_player:s.state.awayPlayers[c],court_number:s.state.courts[c],match_rank:c+1};n.push(r)}var i={home_team_name:s.state.homeTeam,away_team_name:s.state.awayTeam,matches:n};g.post("api/teammatches-all",i).then((function(e){var t=e.data.team_match_id;window.location.href="/matchup/"+t}),(function(e){console.log(e)}))}},s.state={homeTeam:"Tufts",awayTeam:"Bowdoin",homePlayers:["homeA","homeB","homeC","homeD","homeE","homeF","homeG","homeH","homeI"],awayPlayers:["awayA","awayB","awayC","awayD","awayE","awayF","awayG","awayH","awayI"],courts:[1,2,3,4,5,6,7,8,9]},s.handleInputChange=s.handleInputChange.bind(Object(N.a)(s)),s.handleTitleInputChange=s.handleTitleInputChange.bind(Object(N.a)(s)),s}return Object(o.a)(a,[{key:"handleTitleInputChange",value:function(e){var t=e.target,a=t.value,s=t.name;this.setState(Object(f.a)({},s,a))}},{key:"handleInputChange",value:function(e){var t=e.target,a=t.value,s=t.name.split("/"),n=s[1],c=s[0],r=this.state[c].slice();r[n]=a,this.setState(Object(f.a)({},c,r))}},{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"5%"},children:"New Team Matchup"}),Object(d.jsxs)("form",{className:"form-box",onSubmit:this.handleSubmit,children:[Object(d.jsxs)("div",{className:"matchup-row form-row",children:[Object(d.jsx)("div",{className:"col-sm-1",children:Object(d.jsx)("h4",{children:"#"})}),Object(d.jsx)("div",{className:"col-sm-4",children:Object(d.jsx)("div",{className:"form-group",children:Object(d.jsx)("input",{name:"homeTeam",type:"text",className:"form-control",placeholder:"Home Team",value:this.state.homeTeam,onChange:this.handleTitleInputChange})})}),Object(d.jsx)("div",{className:"col-sm-4",children:Object(d.jsx)("div",{className:"form-group",children:Object(d.jsx)("input",{name:"awayTeam",type:"text",className:"form-control",placeholder:"Away Team",value:this.state.awayTeam,onChange:this.handleTitleInputChange})})}),Object(d.jsx)("div",{className:"col-sm-3",children:Object(d.jsx)("h4",{children:"Court"})})]}),Object(y.a)(Array(9)).map((function(t,a){return Object(d.jsxs)("div",{className:"form-row",children:[Object(d.jsx)("div",{className:"col-sm-1 form-group",children:Object(d.jsx)("h4",{children:a+1})}),Object(d.jsx)("div",{className:"col-sm-4 form-group",children:Object(d.jsx)("input",{name:"homePlayers/"+a,type:"text",className:"form-control",placeholder:"Home Player "+(a+1),value:e.state.homePlayers[a],onChange:e.handleInputChange})}),Object(d.jsx)("div",{className:"col-sm-4 form-group",children:Object(d.jsx)("input",{name:"awayPlayers/"+a,type:"text",className:"form-control",placeholder:"Away Player "+(a+1),value:e.state.awayPlayers[a],onChange:e.handleInputChange})}),Object(d.jsx)("div",{className:"col-sm-3 form-group",children:Object(d.jsx)("input",{name:"courts/"+a,type:"text",className:"form-control",placeholder:"#",value:e.state.courts[a],onChange:e.handleInputChange})})]},"match"+a)})),Object(d.jsx)("div",{style:{marginTop:"2%",marginBottom:"2%"},children:Object(d.jsx)("button",{type:"submit",className:"btn btn-secondary",children:"Create"})})]})]})}}]),a}(n.a.Component),_=a(23),k=a.n(_),S=a(39),C=a(36),I=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={info:{},matches:[]},s.handleBeginGame=s.handleBeginGame.bind(Object(N.a)(s)),s.handleContinueGame=s.handleContinueGame.bind(Object(N.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=Object(C.a)(k.a.mark((function e(){var t,a,s,n,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],a=this,e.next=4,Promise.all([g.get("api/matches-summary",{params:{team_match_id:window.location.pathname.split("/")[2]}})]);case 4:s=e.sent,n=Object(S.a)(s,1),c=n[0],O.a.all(c.data.matches.map((function(e){return g.get("api/games-summary",{params:{match_id:e.pk}})}))).then(O.a.spread((function(){for(var e=arguments.length,s=new Array(e),n=0;n<e;n++)s[n]=arguments[n];t=s.map((function(e){return e.data}));var r=c.data.matches.map((function(e,a){return e.games=t[a].sort((function(e,t){return e.game_number>t.game_number?1:-1})),e}));a.setState({info:c.data,matches:r})})));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleBeginGame",value:function(e,t,a){a.preventDefault();var s={match_id:e,game_number:t};g.post("api/games",s).then((function(e){var t=e.data.game_id;window.location.href="/game/"+t+"/scoring"}),(function(e){console.log(e)}))}},{key:"handleContinueGame",value:function(e,t){t.preventDefault(),window.location.href="/game/"+e+"/scoring"}},{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"wrap",children:Object(d.jsxs)("div",{id:"main",className:"container",children:[Object(d.jsx)("h1",{style:{marginTop:"5%"},children:"Matchup"}),Object(d.jsxs)("h2",{style:{marginBottom:"5%"},children:[this.state.info.home_team_name," vs ",this.state.info.away_team_name," "]}),Object(d.jsxs)("table",{className:"table table-bordered",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{className:"w-5 matchup-header",scope:"col",children:"#"}),Object(d.jsx)("th",{className:"w-25 team1-winner",scope:"col",children:this.state.info.home_team_name}),Object(d.jsx)("th",{className:"w-40 matchup-header",scope:"col",children:"Game"}),Object(d.jsx)("th",{className:"w-25 team2-winner",scope:"col",children:this.state.info.away_team_name}),Object(d.jsx)("th",{className:"w-5 matchup-header",scope:"col",children:"Court"})]})}),Object(d.jsx)("tbody",{children:this.state.matches.map((function(t){return Object(d.jsxs)("tr",{children:[Object(d.jsxs)("th",{scope:"row",children:[" ",t.match_rank," "]}),Object(d.jsxs)("td",{className:t.done&&t.home_player_score>t.away_player_score?"team1-winner":"",children:[" ",t.home_player_name," "]}),Object(d.jsxs)("td",{children:[t.games.length>0&&Object(d.jsx)("table",{className:"table table-sm table-bordered table-game-sum table-fixed",children:Object(d.jsxs)("tbody",{children:[Object(d.jsxs)("tr",{children:[t.games.map((function(e){return Object(d.jsx)("td",{className:e.done&&e.home_player_score>e.away_player_score?"team1-winner":"",width:"20%",children:e.home_player_score},"game-"+e.pk)})),t.games.length<5&&Object(y.a)(Array(5-t.games.length)).map((function(e,a){return Object(d.jsx)("td",{width:"20%"},"game-filler-home-"+t.pk+"-"+a)}))]}),Object(d.jsxs)("tr",{children:[t.games.map((function(e){return Object(d.jsx)("td",{className:e.done&&e.home_player_score<e.away_player_score?"team2-winner":"",width:"20%",children:e.away_player_score},"game-"+e.pk)})),t.games.length<5&&Object(y.a)(Array(5-t.games.length)).map((function(e,a){return Object(d.jsx)("td",{width:"20%"},"game-filler-away-"+t.pk+"-"+a)}))]})]})}),!t.done&&(0===t.games.length||t.games[t.games.length-1].done)&&Object(d.jsx)("button",{type:"button",className:"btn btn-outline-secondary m-2",onClick:function(a){return e.handleBeginGame(t.pk,0===t.games.length?1:t.games.length+1,a)},children:"BEGIN MATCH"}),!t.done&&t.games.length>0&&!t.games[t.games.length-1].done&&Object(d.jsx)("button",{type:"button",className:"btn btn-outline-secondary m-2",onClick:function(a){return e.handleContinueGame(t.games[t.games.length-1].pk,a)},children:"CONTINUE MATCH"})]}),Object(d.jsxs)("td",{className:t.done&&t.home_player_score<t.away_player_score?"team2-winner":"",children:[" ",t.away_player_name," "]}),Object(d.jsxs)("td",{children:[" ",t.court_number," "]})]},"match-"+t.pk)}))})]})]})}),Object(d.jsx)("footer",{className:"footer",children:Object(d.jsx)("a",{className:"nav-link",href:"/",children:"Back to Home"})})]})}}]),a}(n.a.Component),T="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMAZnq61vTacjsAAAH7SURBVHja7dpLDYAwFETRFgUNCvg4QENxQP1bwcDrriQkPVfALM56UpIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZKkXrkGlYkAlha0AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACATusxpDMCuMZs758C3O33PQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR0lXWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYDSDXoJIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkqdcLGuVCW7PJm8oAAAAASUVORK5CYII=",B=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={game:{},match:{},match_done:!1,points:[],selection:{team:"home",side:"R"}},s.handleScorePlusOne=s.handleScorePlusOne.bind(Object(N.a)(s)),s.handleBeginNextGame=s.handleBeginNextGame.bind(Object(N.a)(s)),s.handleServeChange=s.handleServeChange.bind(Object(N.a)(s)),s.handleRefereeCall=s.handleRefereeCall.bind(Object(N.a)(s)),s.updateDimensions=s.updateDimensions.bind(Object(N.a)(s)),s.handleLoad=s.handleLoad.bind(Object(N.a)(s)),s.getInitialPointsState=s.getInitialPointsState.bind(Object(N.a)(s)),s.removePointsState=s.removePointsState.bind(Object(N.a)(s)),s.updatePointsState=s.updatePointsState.bind(Object(N.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=window.location.pathname.split("/")[2];g.get("api/games",{params:{game_id:t}}).then((function(a){var s=a.data;e.setState({game:s.game_data,match:s.match_data,points:e.getInitialPointsState(t)}),window.addEventListener("load",e.handleLoad),window.addEventListener("resize",e.updateDimensions),e.updateDimensions()}))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("load",this.handleLoad),window.removeEventListener("resize",this.updateDimensions)}},{key:"componentDidUpdate",value:function(){this.updateDimensions()}},{key:"handleLoad",value:function(){this.updateDimensions()}},{key:"updateDimensions",value:function(){document.getElementById("scrollable").style.height="0px";var e=document.getElementById("target").clientHeight;e<400&&(document.getElementById("scrollable").style.height=e+"px")}},{key:"getInitialPointsState",value:function(e){return JSON.parse(localStorage.getItem("points-"+e))||[]}},{key:"removePointsState",value:function(e){localStorage.removeItem("points-"+e)}},{key:"updatePointsState",value:function(e,t){this.setState({points:t}),localStorage.setItem("points-"+e,JSON.stringify(t))}},{key:"not",value:function(e){return"R"===e?"L":"L"===e?"R":"home"===e?"away":"away"===e?"home":void 0}},{key:"updateSelection",value:function(e){var t=this.state.selection;t.team===e?t.side=this.not(t.side):(t.side="R",t.team=this.not(t.team));var a=t.team+"-"+t.side;this.updateServeButtons(a),this.setState({selection:t})}},{key:"gameOver",value:function(e){var t=Math.abs(e.home_player_score-e.away_player_score)>=2;return(e.home_player_score>=11||e.away_player_score>=11)&&t}},{key:"handleScorePlusOne",value:function(e,t){t.preventDefault();var a=this.state.game;if(!a.done&&!this.gameOver(a)){a[e]+=1;var s=e.split("_")[0];this.updateSelection(s);var n=a[e]+this.state.selection.side,c=this.state.points;if("home"===s?c.push([n,""]):c.push(["",n]),this.updatePointsState(a.game_id,c),this.gameOver(a)){a.done=!0,this.removePointsState(a.game_id);var r=this.state.match;r[a.home_player_score>a.away_player_score?"home_player_score":"away_player_score"]+=1,(r.home_player_score>=3||r.away_player_score>=3)&&(r.done=!0),this.setState({match:r,match_done:!0}),g.patch("api/matches",r).then((function(e){}),(function(e){console.log(e)}))}}this.setState({game:a}),g.patch("api/games",this.state.game).then((function(e){}),(function(e){console.log(e)}))}},{key:"handleBeginNextGame",value:function(e,t,a){a.preventDefault();var s={match_id:e,game_number:t};g.post("api/games",s).then((function(e){var t=e.data.game_id;window.location.href="/game/"+t+"/scoring"}),(function(e){console.log(e)}))}},{key:"updateServeButtons",value:function(e){for(var t=document.getElementsByClassName("serve-change"),a=0;a<t.length;a++)t[a].classList.remove("shaded-blue");document.getElementById(e).classList.add("shaded-blue")}},{key:"handleServeChange",value:function(e){var t=e.target.id.split("-"),a=this.state.selection;a.team=t[0],a.side=t[1],this.setState({selection:a}),this.updateServeButtons(e.target.id)}},{key:"handleRefereeCall",value:function(e,t){console.log("The "+e+" team requests a referee call"),g.post("predict.html").then((function(e){console.log(e)}),(function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"wrap",children:Object(d.jsxs)("div",{id:"main",className:"container",children:[Object(d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"5%"},children:"Game Scoring"}),Object(d.jsxs)("div",{className:"container",style:{paddingRight:"10%",paddingLeft:"10%"},children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h4",{className:"shaded-gray",children:this.state.match.home_team_name})}),Object(d.jsx)("div",{className:"col-4 align-self-center",children:Object(d.jsxs)("h6",{children:["Game ",this.state.game.game_number]})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h4",{className:"shaded-gray",children:this.state.match.away_team_name})})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h5",{className:"shaded-gray",children:Object(d.jsx)("span",{children:this.state.match.home_player_name})})}),Object(d.jsx)("div",{className:"col-4 align-self-center",children:Object(d.jsxs)("h1",{children:[this.state.game.home_player_score," | ",this.state.game.away_player_score]})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h5",{className:"shaded-gray",children:Object(d.jsx)("span",{children:this.state.match.away_player_name})})})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{id:"target",className:"col-4",children:[Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("button",{className:"shaded-gray",onClick:function(t){return e.handleScorePlusOne("home_player_score",t)},children:Object(d.jsx)("img",{src:T,className:"img-fluid w-75",alt:""})})})}),Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("h3",{id:"home-L",className:"serve-change game-button",type:"button",onClick:this.handleServeChange,children:"L"})})}),Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("h3",{id:"home-R",className:"serve-change game-button shaded-blue",type:"button",onClick:this.handleServeChange,children:"R"})})})]}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("div",{id:"scrollable",className:"scrollable",children:Object(d.jsx)("div",{className:"container",children:Object(d.jsx)("h5",{children:this.state.points.map((function(e,t){return Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-6 text-right",children:e[0]}),Object(d.jsx)("div",{className:"col-6 text-left",children:e[1]})]},"point-"+t)}))})})})}),Object(d.jsxs)("div",{className:"col-4",children:[Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("button",{className:"shaded-gray",onClick:function(t){return e.handleScorePlusOne("away_player_score",t)},children:Object(d.jsx)("img",{src:T,className:"img-fluid w-75",alt:""})})})}),Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("h3",{id:"away-L",className:"serve-change game-button",type:"button",onClick:this.handleServeChange,children:"L"})})}),Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:Object(d.jsx)("h3",{id:"away-R",className:"serve-change game-button",type:"button",onClick:this.handleServeChange,children:"R"})})})]})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h5",{className:"shaded-orange",type:"button",onClick:function(t){return e.handleRefereeCall("home",t)},children:"Referee Call"})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h5",{className:"shaded-red game-button",children:"Undo"})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h5",{className:"shaded-orange",type:"button",onClick:function(t){return e.handleRefereeCall("away",t)},children:"Referee Call"})})]}),Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-12",children:this.state.game.done&&!this.state.match.done&&Object(d.jsxs)("button",{type:"button",className:"btn btn-secondary btn-block btn-lg",onClick:function(t){return e.handleBeginNextGame(e.state.match.match_id,e.state.game.game_number+1,t)},children:["START GAME #",this.state.game.game_number+1]})})})]})]})}),Object(d.jsx)("footer",{className:"footer",children:Object(d.jsx)("a",{className:"nav-link",href:"/matchup/"+this.state.match.team_match_id,children:"Back to Team Matchup"})})]})}}]),a}(n.a.Component),P=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={game:{},match:{}},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=window.location.pathname.split("/")[2];g.get("api/games",{params:{game_id:t}}).then((function(t){var a=t.data;e.setState({game:a.game_data,match:a.match_data})}))}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"container",style:{marginBottom:"5%"},children:[Object(d.jsx)("h1",{style:{marginTop:"5%",marginBottom:"5%"},children:"Game Scoreboard"}),Object(d.jsxs)("div",{className:"container shaded-gray",children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h4",{className:"text-left",children:this.state.match.home_team_name})}),Object(d.jsx)("div",{className:"col-4"}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsx)("h4",{className:"text-right",children:this.state.match.away_team_name})})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-5 shaded-dark-gray my-auto pt-2 pb-1",children:Object(d.jsx)("h5",{className:"text-left text-light",children:this.state.match.home_player_name})}),Object(d.jsx)("div",{className:"col-2 align-self-center text-nowrap ",children:Object(d.jsxs)("h1",{children:[this.state.match.home_player_score," | ",this.state.match.away_player_score]})}),Object(d.jsx)("div",{className:"col-5 shaded-dark-gray my-auto pt-2 pb-1",children:Object(d.jsx)("h5",{className:"text-right text-light",children:this.state.match.away_player_name})})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-5 text-center scoreboard",children:this.state.game.home_player_score}),Object(d.jsx)("div",{className:"col-2"}),Object(d.jsx)("div",{className:"col-5 text-center scoreboard",children:this.state.game.away_player_score})]})]})]})}}]),a}(n.a.Component),D=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:"Summary"})})}}]),a}(n.a.Component),R=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsxs)("div",{style:{marginTop:"10%"},children:[Object(d.jsx)("h1",{children:"404 Not Found"}),Object(d.jsx)("a",{className:"nav-link",href:"/",children:"Back to Home"})]})}}]),a}(n.a.Component),Z=(a(67),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(d.jsx)(m.a,{children:Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(j,{}),Object(d.jsx)(b,{}),Object(d.jsxs)(A.c,{children:[Object(d.jsx)(A.a,{exact:!0,path:"/",component:x}),Object(d.jsx)(A.a,{exact:!0,path:"/about",component:v}),Object(d.jsx)(A.a,{exact:!0,path:"/create-matchup",component:w}),Object(d.jsx)(A.a,{exact:!0,path:"/matchup/:team_matchup_id",component:I}),Object(d.jsx)(A.a,{exact:!0,path:"/game/:game_id/scoring",component:B}),Object(d.jsx)(A.a,{exact:!0,path:"/game/:game_id/scoreboard",component:P}),Object(d.jsx)(A.a,{exact:!0,path:"/matchup/:team_matchup_id/summary",component:D}),Object(d.jsx)(A.a,{component:R})]})]})})}}]),a}(n.a.Component)),G=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,74)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),s(e),n(e),c(e),r(e)}))};r.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(Z,{})}),document.getElementById("root")),G()}},[[73,1,2]]]);
//# sourceMappingURL=main.288d44a3.chunk.js.map