import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const StoreAppBar = ({ title }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="title" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

StoreAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StoreAppBar;
