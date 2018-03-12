import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import service from '../dbService';
import ItemForm from './ItemForm';
import Menu from '../Menu';

const styles = {
  root: {},
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

  handleSubmit(item) {
    const menu = [item].concat(this.state.menu).filter(p => p.title);
    this.addMenu(menu);
  }

  get link() {
    return `store?menu=${this.state.hash}`;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <div className={classes.qrcodeWrapper}>
            <Link to={this.link} target="_black">
              <QRCode size={210} value={this.link} />,
            </Link>
          </div>
        </header>
        <ItemForm onCreate={this.handleSubmit} />
        <Menu menu={this.state.menu} />
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
