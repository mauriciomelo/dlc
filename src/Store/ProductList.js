import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Menu from '../Menu';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import Button from 'material-ui/Button';
import StoreAppBar from './StoreAppBar';
const styles = {
  root: {
    flexGrow: 1,
  },
  addButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 10,
  },
};

class ProductList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <StoreAppBar title={this.props.store.name} />
        <Menu
          menu={this.props.store.menu}
          linkTo={id => `${this.props.match.url}/product/${id}`}
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.addButton}
          component={Link}
          to={`${this.props.match.url}/cart`}
        >
          <ShoppingCartIcon />
        </Button>{' '}
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
