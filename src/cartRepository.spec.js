import repository from './cartRepository';
import idb from 'idb-keyval';

describe('#add', () => {
  it('stores the product', async () => {
    idb.set = jest.fn();
    idb.get = jest.fn();

    const product = { id: 'id' };
    await repository.add(product);
    expect(idb.set).toBeCalledWith('cart', [product]);
  });

  it('merges with previous cart', async () => {
    idb.set = jest.fn();
    idb.get = jest.fn();
    const previousProduct = { id: 'previous' };
    idb.get.mockResolvedValue([previousProduct]);
    const product = { id: 'id' };
    await repository.add(product);
    expect(idb.set).toBeCalledWith('cart', [product, previousProduct]);
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
