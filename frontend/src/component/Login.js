import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {connect} from "react-redux";
import {Signin} from "./../action/auth";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      error: '',
      loggedIn: false,
    }
  }

   redClass = {
    'color': 'red'
  }


  Email=(event)=> {
    this.setState({ Email: event.target.value })
  }

  Password=(event)=> {
    this.setState({ Password: event.target.value })
  }

  login=(event)=> {
    
    if (!this.state.Email) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.Password) {
      return this.setState({ error: 'Password is required' });
    }
    this.setState({ error: '' });
    const data = {
      email:this.state.Email,
      password:this.state.Password
    }
    fetch('http://localhost:8080/login',data, {
      method: 'get',
      datatype: 'json',
    }).then((Response) => Response.json())
      .then((result) => {
      
        if (result.length>0) {
          localStorage.setItem("userDetails", result)
          this.props.loginhnadle(result.Status);
          this.props.history.push('/table')
        }
        else
          return this.setState({ error: 'invalid  user' });
      })
     
  }



  render() {
    const classes = makeStyles(theme => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
           
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.Email}
                onChange={(e)=>this.setState({Email:e.target.value})}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.Password}
                onChange={(e)=>this.setState({Password:e.target.value})}
                autoComplete="current-password"
              />
              
              
              <a onClick={()=>this.login()} className="btn btn-primary btn-user btn-block">
              Sign In
                  </a>
             
            </form>
          </div>
          
        </Container>
      );


  }

}

const mapStateToProps = ({auth}) =>{
    const {loggedIn} = auth;
    return {loggedIn}
}
export default connect(mapStateToProps,{Signin})(Login);
