import idb from 'idb-keyval';
import uuid from 'uuid/v4';

const add = async product => {
  const previous = await all();
  const productWithId = { ...product, ...{ id: uuid() } };
  return await idb.set('cart', [productWithId].concat(previous));
};

const all = async () => {
  return (await idb.get('cart')) || [];
};

export default {
  add,
  all,
};
