import idb from 'idb-keyval';

let repository;
describe('#add', () => {
  beforeEach(() => {
    repository = require('./cartRepository').default;
    jest.mock('uuid/v4');
    idb.set = jest.fn();
    idb.get = jest.fn();
    require('uuid/v4').mockReturnValue('generated-id');
  });

  it('stores the product', async () => {
    const product = { product: { id: 'id' } };
    const expected = { product: { id: 'id' }, id: 'generated-id' };
    await repository.add(product);
    expect(idb.set).toBeCalledWith('cart', [expected]);
  });

  it('merges with previous cart', async () => {
    idb.set = jest.fn();
    idb.get = jest.fn();
    const previousProduct = { id: 'previous' };
    idb.get.mockResolvedValue([previousProduct]);
    const product = { product: { id: 'id' } };
    await repository.add(product);
    expect(idb.set).toBeCalledWith('cart', [
      { ...product, ...{ id: 'generated-id' } },
      previousProduct,
    ]);
  });
});

describe('#all', () => {
  it('gets all products', async () => {
    idb.get = jest.fn();
    const products = [{ id: 'id' }, { id: 'id2' }];
    idb.get.mockResolvedValue(products);
    expect(await repository.all()).toEqual(products);
  });

  it('retuns empty array when there is no product', async () => {
    idb.get = jest.fn();
    idb.get.mockResolvedValue(undefined);
    expect(await repository.all()).toEqual([]);
  });
});
