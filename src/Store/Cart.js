import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import cart from '../cartRepository';
import StoreAppBar from './StoreAppBar';
import PageActions from './PageActions';
import path from 'path';
import service from '../dbService';

const styles = {};

class Cart extends React.Component {
  state = {
    redirect: false,
    cart: [],
  };

  async componentWillMount() {
    this.setState({ cart: await cart.all() });
  }

  handleRequest = () => {
    service.requestToBuy(this.props.store.publicKey);
  };

  handleClose = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={path.resolve(this.props.match.path, '../')} />;
    }
    return (
      <div>
        <StoreAppBar title="My Cart" />

        <List>
          {this.state.cart.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.product.title} />
            </ListItem>
          ))}
        </List>
        <PageActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="raised" color="primary" onClick={this.handleRequest}>
            Request
          </Button>
        </PageActions>
      </div>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
