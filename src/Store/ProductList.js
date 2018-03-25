import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import service from '../dbService';
import Menu from '../Menu';
import Cart from './Cart';
import StoreAppBar from './StoreAppBar';
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
        <StoreAppBar title={this.props.store.name} />
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
