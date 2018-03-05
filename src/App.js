import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import axios from 'axios';
import QRCode from 'qrcode.react';

import './App.css';

const styles = {
  root: {
    // flexGrow: 1,
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

  componentDidMount() {
    const create = () => {
      // Create the IPFS node instance

      this.node = new window.Ipfs({ repo: String(Math.random() + Date.now()) });

      this.node.once('ready', () => {
        console.log('IPFS node is ready');
        ops();
      });
    };

    const ops = () => {
      this.node.id((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          id: res.id,
          version: res.agentVersion,
          protocol_version: res.protocolVersion,
        });

        this.add();

        if (this.isViewOnly) {
          axios
            .get(`https://ipfs.io/ipfs/${getSearchParam('menu')}`)
            .then(data => {
              console.log('da promessa: ', data);
              this.setState({ fetchedMenu: data.data });
            });
        }
      });
    };
    create();
  }

  add() {
    const post = {
      title: this.state.title,
      description: this.state.description,
    };
    const menu = [post].concat(this.state.menu).filter(p => p.title !== '');

    this.setState({ menu });
    const text = JSON.stringify(menu);

    console.log('added', text);

    this.node.files.add([Buffer.from(text)], (err, filesAdded) => {
      if (err) {
        throw err;
      }

      const hash = filesAdded[0].hash;
      this.setState({ added_file_hash: hash });
      console.log({ hash });
      this.node.files.cat(hash, (err, data) => {
        if (err) {
          throw err;
        }
        this.setState({ added_file_contents: data });
      });
    });
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
          <div>
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
            <Button color="primary" onClick={this.handleSubmit}>
              create
            </Button>

            <a href={this.link} target="_black">
              <QRCode value="http://facebook.github.io/react/" />,
            </a>
          </div>
        )}

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
