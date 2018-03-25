import idb from 'idb-keyval';

const add = async product => {
  const previous = await all();
  return await idb.set('cart', [product].concat(previous));
};

const all = async () => {
  return (await idb.get('cart')) || [];
};

export default {
  add,
  all,
};
