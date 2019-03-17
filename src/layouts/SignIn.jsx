import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { apiUrl } from '../config.js';
import { connect } from 'react-redux';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    //console.log(this.classes);
    this.state = {
      email: '',
      password: ''
    };
    this.logIn = this.logIn.bind(this);
  }

  logIn(event) {
    event.preventDefault();
    /*fetch(apiUrl + "/auth", {login: this.state.login, password: this.state.password})
      .then(
        function (response) {
          if (response.status !== 200) {
            alert("Invalid login or password")
            return;
          }
          // Examine the text in the response
          response.json().then(function (data) {
            console.log(data);
            this.props.history.push('/admin/dashboard');
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });*/
    this.props.dispatch({type: 'UPDATE', token: this.state.email + "token"});
    this.props.history.push('/admin/dashboard');
  }

  render() {
    return (
      <main className={this.classes.main}>
        <CssBaseline />
        <Paper className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={this.classes.form} onSubmit={this.logIn}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus
                value={this.state.email} onChange={evt => this.setState({ email: evt.target.value })} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password"
                value={this.state.password} onChange={evt => this.setState({ password: evt.target.value })} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
            >
              Sign in
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

const SignInStyled = withStyles(styles)(SignIn);

export default connect(mapStateToProps)(SignInStyled);