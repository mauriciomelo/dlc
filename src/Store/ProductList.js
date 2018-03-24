import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import service from '../dbService';
import Menu from '../Menu';
import Cart from './Cart';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProductList extends Component {
  handleRequest = () => {
    service.requestToBuy(this.props.store.publicKey);
  };

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

        <Menu
          menu={this.props.store.menu}
          linkTo={id => `${this.props.match.url}/product/${id}`}
        />

        <Cart onRequest={this.handleRequest} />
      </div>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
