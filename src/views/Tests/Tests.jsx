import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import { DropzoneArea } from 'material-ui-dropzone'

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import avatar from "assets/img/faces/marc.jpg";
//Hello
import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath } from '../../config.js'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class TestsSelector extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      files: [],
      tests: [],
    };
  }

  componentDidMount() {
    var tests = [
      {
        testId: 1,
        name: "Math Test",
        questions: [
          {
            questionText: "Question 1",
            questionId: 1,
            answers: [
              {
                answerText: "hot",
                answerId: 0,
              },
              {
                answerText: "cold",
                answerId: 4,
              }
            ]
          },
          {
            questionText: "Question 2",
            questionId: 3,
            answers: [
              {
                answerText: "mean",
                answerId: 1,
              },
              {
                answerText: "dumb",
                answerId: 2,
              }
            ]
          }
        ]
      },
      {
        testId: 2,
        name: "Programming test",
        questions: [],
      }
    ];
    fetch(apiUrl + "/test/getTests", {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        // 'Content-Type': 'application/json'
      })
    })
    .then(
      (response) => {
        console.log(response.status);
        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
          this.setState({
            tests: data,
          })
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      this.setState({
        tests: tests,
      })
    });
  }

  getTests() {
    const { classes } = this.classes;
    //alert(JSON.stringify(tests));
    return this.state.tests.map(test => (
      <Grid item className={this.classes.paper}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                required
            </Typography>
              <Typography variant="h5" component="h2">
                {test.name}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button variant="outlined" onClick={() => {
                this.props.history.push("/test");
                localStorage.setItem("test", JSON.stringify(test));
                //alert(localStorage.getItem("test"));
              }
              } component="span" className={classes.button}>
                Open
              </Button>
            </CardActions>
          </Card>
        </div>
      </Grid>
    ));
  }

  render() {
    return (
      <Grid container className={this.classes.root} spacing={24}>
        {this.getTests()}
      </Grid>
    );
  }
}

TestsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

// function UserProfile(props) {
//   const { classes } = props;

// }

export default withStyles(styles)(TestsSelector);
