import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import service from '../dbService';
import Menu from '../Menu';
import queryString from 'query-string';
import Cart from './Cart';

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
      store: {
        menu: [],
      },
    };
  }

  get hash() {
    return queryString.parseUrl(window.location.href).query.hash;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const store = await service.cat(this.hash);
    this.setState({ store, isLoading: false });
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
        <Menu menu={this.state.store.menu} />

        <Cart />
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
