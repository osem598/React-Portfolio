import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errorText:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        axios.post("https://api.devcamp.space/sessions",
        { 
        client:{
            email:this.state.email,
            password:this.state.password
        }
    },
    {withCredentials: true }  
        ).then(response => {
            if(response.data.status === 'created'){
                this.props.handleSuccessfulAuth();
                
            } else{
               this.setState({
                   errorText:"wrong email or password"
               }) 
               this.props.handleUnsuccessfulAuth();
            }



        }).catch(error => {
            console.log("There was an error:", error)
            this.setState({
                errorText:"An error occurred"
            })
        })

        event.preventDefault();
    }





    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            errorText:""
        });
    }

    
    render(){
        return(
            <div>
                <h1> LOGIN TO DASHBOARD</h1>
        <div>{this.state.errorText}</div>

                <form onSubmit={this.handleSubmit}>
                    <input
                    type="email"
                    name="email" 
                    placeholder="Email Here"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                    <input
                    type="password"
                    name="password" 
                    placeholder="password Here"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                <div>
                    <button type="submit">Login</button>
                </div>


                </form>
            </div>
        )
    }
}