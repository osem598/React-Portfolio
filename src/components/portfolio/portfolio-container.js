import React, {Component} from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item"
import portfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component{
    constructor(){
        super();

        this.state = {
            PageTitle: "",
            isLoading: false,
            data:[]
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item =>{
                return item.category === filter;
            })
        })
    }



    getPortfolioItems(){
        const axios = require('axios');
     
    // Make a request for a user with a given ID
    axios.get('https://davidcrighton.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        console.log("response data", response);
        this.setState({
            data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      }


    portfolioItems(){

        return this.state.data.map(item =>{
            return <PortfolioItem
             key= {item.id}
             item = {item}

             />

        })
    }

 componentDidMount(){
    this.getPortfolioItems();
 }

    render(){
        

        if (this.state.isLoading){
            return(<div>Loading...</div>)
        }
        return(
            <div>
                <h2>
                    {this.state.PageTitle}
                    
                </h2>

               


                <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('Challenges')}>Challenges</button>
                <button className="btn" onClick={() => this.handleFilter('General')}>General</button>
                <button className="btn" onClick={() => this.handleFilter('Good')}>Good</button>
                {this.portfolioItems()}
              

                </div>


            </div>
        )
    }
}