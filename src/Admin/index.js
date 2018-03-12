import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
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
    menu: [],
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const menu = await service.getLocalMenu();
    console.log({ menu });
    this.setState({ menu });
    this.addMenu(menu);
  }

  async addMenu(menu) {
    this.setState({ menu });
    const filesAdded = await service.add(menu);
    const hash = filesAdded[0].hash;
    this.setState({ hash: hash });
    console.log({ hash });
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSubmit(item) {
    const menu = [item].concat(this.state.menu).filter(p => p.title);
    this.addMenu(menu);
  }

  get link() {
    return `store?menu=${this.state.hash}`;
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
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={this.link}
                    target="_black"
                  >
                    View public catalog
                  </Link>
                </MenuItem>
                <MenuItem style={{ height: 'auto' }} onClick={this.handleClose}>
                  <Link to={this.link} target="_black">
                    <QRCode size={210} value={this.link} />,
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <ItemForm onCreate={this.handleSubmit} />
        <StoreMenu menu={this.state.menu} />
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
