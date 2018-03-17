import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 10,
  },
};

class Cart extends React.Component {
  state = {
    open: false,
  };

  handleRequest = () => {
    this.props.onRequest();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <div>
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.addButton}
          onClick={this.handleClickOpen}
        >
          <ShoppingCartIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">My Cart</DialogTitle>
          <DialogContent>My cart content</DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleRequest}
            >
              Request
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Cart.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default withMobileDialog()(withStyles(styles)(Cart));
