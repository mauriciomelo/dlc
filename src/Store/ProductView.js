import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import cart from '../cartRepository';
import path from 'path';

const styles = {
  root: {},
};

class ProductView extends Component {
  state = { redirect: false };

  addProduct = async () => {
    await cart.add(this.product);
    this.setState({ redirect: true });
  };

  get product() {
    return this.props.store.menu.find(
      p => p.id === this.props.match.params.productId
    );
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
        <Typography variant="headline" component="h2">
          {this.product.title}
        </Typography>
        <Typography component="p">{this.product.description}</Typography>

        <Button onClick={this.addProduct} variant="raised" color="primary">
          Add to cart
        </Button>
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
