import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import QRCode from 'qrcode.react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import Typography from 'material-ui/Typography';
import service from '../dbService';
import ItemForm from './ItemForm';
import Menu, { MenuItem } from 'material-ui/Menu';
import StoreMenu from '../Menu';
const styles = {
  root: {},
  flex: {
    flex: 1,
  },
  qrcodeWrapper: {
    textAlign: 'right',
  },
  header: {
    padding: '15px',
  },
};

class Admin extends Component {
  state = {
    hash: '',
    store: {
      menu: [],
    },
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const store = await service.getLocalMenu();
    this.setState({ store });
    this.addMenu(store);

    service.clientRequest.subscribe(msg => {
      if (msg === 'buy-request') {
        alert('Someone wants to buy!');
      }
    });
  }

  async addMenu(store) {
    this.setState({ store });
    const filesAdded = await service.add(store);
    const hash = filesAdded[0].hash;
    this.setState({ hash: hash });
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSubmit(item) {
    const menu = [item].concat(this.state.store.menu).filter(p => p.title);
    this.addMenu({ ...this.state.store, ...{ menu } });
  }

  get link() {
    return `${window.location.origin}${window.location.pathname}#/store/${
      this.state.hash
    }`;
  }

  render() {
    const { classes } = this.props;
    const isMenuOpen = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              dlç
            </Typography>
            <div>
              <IconButton
                aria-owns={isMenuOpen ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Visibility />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={this.link}
                    target="_black"
                  >
                    View public catalog
                  </a>
                </MenuItem>
                <MenuItem style={{ height: 'auto' }} onClick={this.handleClose}>
                  <a href={this.link} target="_black">
                    <QRCode size={210} value={this.link} />,
                  </a>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <ItemForm onCreate={this.handleSubmit} />
        <StoreMenu menu={this.state.store.menu} />
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Admin);
