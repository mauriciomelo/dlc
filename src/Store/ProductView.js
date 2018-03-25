import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import cart from '../cartRepository';
import path from 'path';
import StoreAppBar from './StoreAppBar';
import QuantityInput from './QuantityInput';
import Divider from 'material-ui/Divider';

const styles = {
  root: {
    flex: 1,
  },
  content: {
    padding: '20px',
  },
  quantityWrapper: {
    display: 'flex',
    margin: '3em 0',
    alignItems: 'center',
  },
  unitPrice: {
    flex: 1,
  },
  quantity: {
    flex: 1,
  },
  totalPrice: {
    float: 'right',
    marginTop: '1em',
    fontSize: '1.5em',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '20px',
    width: '100%',
    textAlign: 'right',
  },
};

class ProductView extends Component {
  state = { redirect: false, quantity: 1 };

  addProduct = async () => {
    await cart.add({ ...this.product, ...{ quantity: this.state.quantity } });
    this.close();
  };

  close = () => this.setState({ redirect: true });

  get product() {
    return this.props.store.menu.find(
      p => p.id === this.props.match.params.productId
    );
  }

  handleQuantity = quantity => {
    this.setState({ quantity });
  };

  get total() {
    return this.product.price * this.state.quantity;
  }

  render() {
    const { classes } = this.props;
    if (!this.product) {
      return null;
    }
    if (this.state.redirect) {
      return <Redirect to={path.resolve(this.props.match.path, '../..')} />;
    }

    return (
      <div className={classes.root}>
        <StoreAppBar title={this.product.title} />
        <div className={classes.content}>
          <Typography component="p">{this.product.description}</Typography>

          <div className={classes.quantityWrapper}>
            <Typography className={classes.unitPrice}>
              Price per unit: ${this.product.price}
            </Typography>
            <QuantityInput
              className={classes.quantity}
              onChange={this.handleQuantity}
            />
          </div>

          <Divider />

          <Typography className={classes.totalPrice}>
            Total: ${this.total}
          </Typography>
          <div className={classes.actions}>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addProduct} variant="raised" color="primary">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ProductView.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductView);
