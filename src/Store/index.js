import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import service from '../dbService';
import Menu from '../Menu';
import queryString from 'query-string';

const styles = {
  root: {
    flexGrow: 1,
  },
  spinnerWrapper: {
    marginTop: '40px',
    textAlign: 'center',
  },
  spinner: {},
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      menu: [],
    };
  }

  get menuHash() {
    return queryString.parseUrl(window.location.href).query.menu;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const menu = await service.cat(this.menuHash);
    this.setState({ menu, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              dlç
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.isLoading ? (
          <div className={classes.spinnerWrapper}>
            <CircularProgress className={classes.spinner} color="secondary" />
          </div>
        ) : null}
        <Menu menu={this.state.menu} />
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
