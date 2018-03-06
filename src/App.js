import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import QRCode from 'qrcode.react';
import service from './dbService';
import './App.css';

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
  card: {
    width: '100%',
    minHeight: '120px',
    display: 'block',
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

const getSearchParam = name => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: null,
      version: null,
      protocol_version: null,
      added_file_hash: null,
      added_file_contents: null,
      title: '',
      description: '',
      isLoading: false,
      fetchedMenu: [],
      menu: [
        {
          title: 'Carne de sol',
          description:
            'É servida acompanhada por arroz branco, feijão de corda (também conhecido com feijão verde), vinagrete (tomate, cebola e coentro cortados bem pequenos temperados com vinagre, azeite e sal), farofa de ovo ou de cebola e em alguns lugares de jerimum, queijo coalho frito, macaxeira cozida ou frita e a manteiga de garrafa',
        },
        {
          title: 'Escondidinho de macaxeira',
          description:
            'O escondidinho é feito com um tipo de purê de macaxeira com requeijão',
        },
      ],
    };
  }

  async componentDidMount() {
    if (this.isViewOnly) {
      this.setState({ isLoading: true });
      const fetchedMenu = await service.cat(getSearchParam('menu'));
      console.log({ fetchedMenu });
      this.setState({ fetchedMenu, isLoading: false });
    }

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
    this.setState({ added_file_hash: hash });
    console.log({ hash });
  }

  get isViewOnly() {
    const menuHash = getSearchParam('menu');
    return Boolean(menuHash);
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

  get menu() {
    return this.isViewOnly ? this.state.fetchedMenu : this.state.menu;
  }

  get link() {
    return `${window.location.origin}${window.location.pathname}?menu=${
      this.state.added_file_hash
    }`;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Reboot />
        <AppBar position="static" color="default">
          <Toolbar className={classes.appBar}>
            <Typography variant="title" color="inherit">
              dlç
            </Typography>
          </Toolbar>
        </AppBar>
        {this.isViewOnly ? null : (
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
                  <a href={this.link} target="_black">
                    <QRCode size={210} value={this.link} />,
                  </a>
                </div>
              </Grid>
            </Grid>
          </header>
        )}
        {this.state.isLoading ? (
          <div className={classes.spinnerWrapper}>
            <CircularProgress className={classes.spinner} color="secondary" />
          </div>
        ) : null}

        <List>
          {this.menu.map(item => (
            <ListItem key={item.title}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="headline" component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="p">{item.description}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(App);
