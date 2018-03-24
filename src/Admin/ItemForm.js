import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import uuid from 'uuid/v4';

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 10,
  },
};
class ItemForm extends React.Component {
  state = {
    open: false,
    item: {},
  };

  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    this.props.onCreate({ ...this.state.item, ...{ id: uuid() } });
    this.handleClose();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    const value =
      name === 'price' ? Number(event.target.value) : event.target.value;
    const item = { ...this.state.item, ...{ [name]: value } };
    this.setState({ item });
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
          <AddIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Add a new item</DialogTitle>
          <DialogContent>
            <TextField
              id="title"
              label="Title"
              onChange={this.handleChange('title')}
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              onChange={this.handleChange('description')}
              margin="normal"
            />
            <TextField
              className={classes.formControl}
              label="Price"
              onChange={this.handleChange('price')}
              type="number"
              id="price"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleCreate}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(ItemForm));
