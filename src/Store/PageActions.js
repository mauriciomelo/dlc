import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { DialogActions } from 'material-ui/Dialog';
const styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'right',
  },
};

const PageSctions = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <DialogActions>{children}</DialogActions>
    </div>
  );
};

PageSctions.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageSctions);
