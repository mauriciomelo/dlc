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

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 10,
  },
};
class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    title: '',
    description: '',
  };

  constructor() {
    super();
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleTitleInput(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleDescriptionInput(event) {
    const description = event.target.value;
    this.setState({ description });
  }

  handleCreate() {
    this.props.onCreate({
      title: this.state.title,
      description: this.state.description,
    });

    this.handleClose();
  }

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
              onChange={this.handleTitleInput}
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              onChange={this.handleDescriptionInput}
              margin="normal"
            />
            <br />
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

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
