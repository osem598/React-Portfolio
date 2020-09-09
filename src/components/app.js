import React, { Component } from 'react';
import axios from 'axios';


import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'


import NavigationContainer from './navigation/navigationContainer';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from "./pages/auth";
import NoMatch from './pages/no-match';
import PortfolioManager from './pages/portfolio-manager';
import Icons from '../helpers/icons';




export default class App extends Component {

  constructor(props){
    super(props);


    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
    this.handleSuccessfulLogOut = this.handleSuccessfulLogOut.bind(this)

  }

  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus:"LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus:"NOT_LOGGED_IN"
    })
  }


  handleSuccessfulLogOut(){
    this.setState({
      loggedInStatus:"LOGGED_OUT"
    })
  }



  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in", {withCredentials: true}).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus


      if(loggedIn && loggedInStatus === "LOGGED_IN"){
        return loggedIn
      }else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus:"LOGGED_IN"
        })
      }else if (!loggedIn && loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus:"NOT_LOGGED_IN"
        })
      }
        
    })
    .catch(error =>{
      console.log("Error:", error);
    })
  }


componentDidMount(){
  this.checkLoginStatus();
}


authorizedPages(){
  return[
    
    <Route key="portfolio-manager" path="/portfoliomanager" component={PortfolioManager} />
  ]
}







  render() {
   
    return (
      <div className='app'>

        

      <Router>
        <div>
        <NavigationContainer
         loggedInStatus={this.state.loggedInStatus}
         handleSuccessfulLogOut={this.handleSuccessfulLogOut}
          />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" render={props =>(
            <Auth
            {...props}
            handleSuccessfulLogin ={this.handleSuccessfulLogin}
            handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
            />
      
          )} 
          />
          <Route path="/about-me" component={About} />
          <Route path="/contact-us" component={Contact} />


          <Route path="/blog" 
          
          render={props =>(
            <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
          )
          }
          
          />


          <Route path="/b/:slug" component={BlogDetail} />
         {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()):null}
          <Route path="/portfolio/:slug" component={PortfolioDetail} />
          <Route component={NoMatch} />


          
          
        </Switch>
        </div>
      </Router>
      </div>
    );
  }
}
