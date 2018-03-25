import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import ProductList from './ProductList';
import ProductView from './ProductView';
import service from '../dbService';
import { withStyles } from 'material-ui/styles';

const styles = {
  spinnerWrapper: {
    marginTop: '40px',
    textAlign: 'center',
  },
  spinner: {},
};

class Store extends React.Component {
  state = {
    isLoading: false,
    store: {
      menu: [],
    },
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const store = await service.cat(this.props.match.params.hash);
    this.setState({ store, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}/`}
            render={props => (
              <ProductList store={this.state.store} {...props} />
            )}
          />
          <Route
            path={`${this.props.match.url}/product/:productId`}
            render={props => (
              <ProductView store={this.state.store} {...props} />
            )}
          />
        </Switch>
        {this.state.isLoading ? (
          <div className={classes.spinnerWrapper}>
            <CircularProgress className={classes.spinner} color="primary" />
          </div>
        ) : null}
      </div>
    );
  }
}

Store.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Store);
