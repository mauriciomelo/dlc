import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import service from '../dbService';
import Menu from '../Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#ff5722',
    color: 'white',
  },
  listItem: {
    width: '100%',
  },
  spinnerWrapper: {
    marginTop: '40px',
    textAlign: 'center',
  },
  spinner: {},
  form: {
    padding: '15px',
  },
  qrcodeWrapper: {
    textAlign: 'right',
  },
  header: {
    padding: '15px',
  },
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: null,
      title: '',
      description: '',
      hash: '',
      menu: [],
    };
  }

  async componentDidMount() {
    this.setState({ menu: await service.getLocalMenu() });
    this.add();
  }

  async add() {
    const post = {
      title: this.state.title,
      description: this.state.description,
    };
    const menu = [post].concat(this.state.menu).filter(p => p.title !== '');

    this.setState({ menu });
    const filesAdded = await service.add(menu);
    const hash = filesAdded[0].hash;
    this.setState({ hash: hash });
    console.log({ hash });
  }

  handleTitleInput(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleDescriptionInput(event) {
    const description = event.target.value;
    this.setState({ description });
  }

  handleSubmit() {
    this.add(this.state.menu);
  }

  get link() {
    return `store?menu=${this.state.hash}`;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <Grid container>
            <Grid item xs={6}>
              <Paper className={classes.form}>
                <TextField
                  id="title"
                  label="Title"
                  onChange={this.handleTitleInput}
                  margin="normal"
                />
                <br />
                <TextField
                  id="description"
                  label="Description"
                  onChange={this.handleDescriptionInput}
                  margin="normal"
                />
                <br />

                <Button color="primary" onClick={this.handleSubmit}>
                  create
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.qrcodeWrapper}>
                <Link to={this.link} target="_black">
                  <QRCode size={210} value={this.link} />,
                </Link>
              </div>
            </Grid>
          </Grid>
        </header>
        <Menu menu={this.state.menu} />
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
