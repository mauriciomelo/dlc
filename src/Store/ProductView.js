import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  root: {},
};

class ProductView extends Component {
  render() {
    const { classes } = this.props;
    const item = this.props.store.menu.find(
      p => p.id === this.props.match.params.productId
    );
    if (!item) {
      return null;
    }
    return (
      <div className={classes.root}>
        <Typography variant="headline" component="h2">
          {item.title}
        </Typography>
        <Typography component="p">{item.description}</Typography>

        <Button variant="raised" color="primary">
          Add to cart
        </Button>
      </div>
    );
  }
}

ProductView.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductView);
