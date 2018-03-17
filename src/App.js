import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

        <Main />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
