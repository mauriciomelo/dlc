import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import service from '../dbService';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class UserRequestDialog extends React.Component {
  state = {
    open: false,
    cart: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  async componentDidMount() {
    service.clientRequest.subscribe(cart => {
      this.setState({ open: true, cart });
    });
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Accept Request?
          </DialogTitle>
          <DialogContent>
            <List>
              {this.state.cart.map(item => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.quantity}x ${item.product.title}`}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ignore
            </Button>
            <Button
              onClick={this.handleClose}
              variant="raised"
              color="primary"
              autoFocus
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UserRequestDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(UserRequestDialog);
