import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

const styles = {
  root: {},
  value: {
    display: 'inline-block',
    fontSize: '1em',
    width: '2em',
    textAlign: 'center',
  },
  add: {
    background: `linear-gradient(45deg, ${green[500]} 30%, ${
      green['A700']
    } 90%)`,
    color: 'white',
  },
  remove: {
    background: `linear-gradient(45deg, ${red[500]} 30%, ${red['A700']} 90%)`,
    color: 'white',
  },
};
const min = 1;
class QuantityInput extends Component {
  state = { value: min };

  handleIncrease = () => {
    const value = this.state.value + 1;
    this.setState({ value });
    this.props.onChange(value);
  };

  handleDecrease = () => {
    const value = this.state.value > min ? this.state.value - 1 : min;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          onClick={this.handleDecrease}
          variant="fab"
          mini
          aria-label="remove"
          className={classes.remove}
        >
          <RemoveIcon />
        </Button>

        <Typography className={classes.value}>{this.state.value}</Typography>

        <Button
          onClick={this.handleIncrease}
          variant="fab"
          mini
          aria-label="add"
          className={classes.add}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

QuantityInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuantityInput);
