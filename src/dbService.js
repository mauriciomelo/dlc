import axios from 'axios';
import idb from 'idb-keyval';

const node = new window.Ipfs({ repo: String(Math.random() + Date.now()) });
window.node = node;
let isReady = false;

node.once('ready', () => {
  isReady = true;
});

const waitForReady = () => {
  return new Promise((res, rej) => {
    const check = () => {
      setTimeout(() => {
        if (isReady) {
          res();
        } else {
          check();
        }
      }, 100);
    };

    check();
  });
};

const cat = async hash => {
  await waitForReady();
  const data = await node.files.cat(hash);
  return JSON.parse(data.toString('utf8'));
};

const get = async hash => {
  const { data } = await axios.get(`https://ipfs.io/ipfs/${hash}`);
  return data;
};

const getLocalMenu = async () => {
  const demo = [
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
  ];
  const menu = await idb.get('menu');
  return menu ? menu : demo;
};

const add = async file => {
  idb.set('menu', file);
  await waitForReady();
  const text = JSON.stringify(file);
  const filesAdded = await node.files.add([Buffer.from(text)]);
  const hash = filesAdded[0].hash;
  get(hash); // workaround to propagate the file to the gateways, aparently js-ipfs is having a bad time to do it by itself
  return filesAdded;
};

export default {
  add,
  cat,
  getLocalMenu,
};
