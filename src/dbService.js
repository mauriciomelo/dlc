import idb from 'idb-keyval';
const node = new window.Ipfs({
  repo: String(Math.random() + Date.now()),
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      ],
    },
  },
});

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
  return filesAdded;
};

export default {
  add,
  cat,
  getLocalMenu,
};
