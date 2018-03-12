import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { Main } from './Main';
import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Reboot />
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              dlç
            </Typography>
          </Toolbar>
        </AppBar>
        <Main />
      </div>
    );
  }
}

export default withStyles(styles)(App);
