import idb from 'idb-keyval';
import Room from 'ipfs-pubsub-room';
import { Subject } from 'rxjs/Subject';
import NodeRSA from 'node-rsa';

const node = new window.Ipfs({
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

let room;
window.node = node;

let isReady = false;

node.once('ready', () => {
  room = Room(node, 'dlc-test-room');
  window.room = room;
  isReady = true;

  room.on('peer joined', peer => {
    console.log('Peer joined the room', peer); // eslint-disable-line no-console
  });

  room.on('peer left', peer => {
    console.log('Peer left...', peer); // eslint-disable-line no-console
  });

  room.on('subscribed', () => {
    console.log('Now connected!'); // eslint-disable-line no-console
  });

  room.on('message', async message => {
    const key = new NodeRSA(await idb.get('private-key'));
    try {
      const decryptedMessage = key.decrypt(message.data).toString();
      clientRequest.next(JSON.parse(decryptedMessage));
    } catch (e) {
      console.info('Ignored message'); // eslint-disable-line no-console
    }
  });
});

const createInitialStore = async () => {
  if (!await idb.get('store')) {
    const key = new NodeRSA({ b: 2048 });
    await idb.set('private-key', key.exportKey('private').toString());

    const demoStore = {
      name: 'Demo Store',
      publicKey: key.exportKey('public').toString(),
      menu: [
        {
          id: '9bb2555f-22d2-45bc-8b1d-96f864c41e49',
          title: 'Carne de sol',
          price: 42.0,
          description:
            'É servida acompanhada por arroz branco, feijão de corda (também conhecido com feijão verde), vinagrete (tomate, cebola e coentro cortados bem pequenos temperados com vinagre, azeite e sal), farofa de ovo ou de cebola e em alguns lugares de jerimum, queijo coalho frito, macaxeira cozida ou frita e a manteiga de garrafa',
        },
        {
          id: '74516732-10cb-452b-8c5e-35823456573b',
          title: 'Escondidinho de macaxeira',
          price: 14.5,
          description:
            'O escondidinho é feito com um tipo de purê de macaxeira com requeijão',
        },
      ],
    };

    await idb.set('store', demoStore);
  }
};

createInitialStore();

const clientRequest = new Subject();

const requestToBuy = (publicKey, cart) => {
  const storeKey = new NodeRSA(publicKey);
  const message = storeKey.encrypt(JSON.stringify(cart));
  room.broadcast(message);
};

const waitForReady = () => {
  return new Promise(res => {
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
  await createInitialStore();
  const store = await idb.get('store');
  return store;
};

const add = async file => {
  idb.set('store', file);
  await waitForReady();
  const text = JSON.stringify(file);
  const filesAdded = await node.files.add([Buffer.from(text)]);
  return filesAdded;
};

export default {
  add,
  cat,
  clientRequest,
  requestToBuy,
  getLocalMenu,
};
