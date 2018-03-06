import axios from 'axios';

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

const add = async file => {
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
  get,
};
