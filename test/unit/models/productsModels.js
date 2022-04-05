const productsModel = require('../../../models/productsModel');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Tests productModel', () => {
  const fakeProductList = [
    {
      id: 1,
      name: 'Batman Belt',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Superman Suit',
      quantity: 3,
    },
  ];
  const fakeProduct = {
    id: 1,
    name: 'Batman Belt',
    quantity: 10,
  };
  const updatedProduct = {
    id: 1,
    name: 'Batman Belt',
    quantity: 9,
  };
  const updatedFakeProductList = [
    {
      id: 1,
      name: 'Batman Belt',
      quantity: 9,
    },
    {
      id: 2,
      name: 'Superman Suit',
      quantity: 3,
    },
  ];
  const newFakeProduct = {
    id: 10,
    name: 'Batman Mask',
    quantity: 1,
  };
  
  describe('Get all products from the database', () => {
    before(async () => {
      // no model o array é desestruturado!!
      sinon.stub(connection, 'execute').resolves([fakeProductList]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('if successful, returns all products from database as an array', async () => {
      const products = await productsModel.getAllProducts();
      // console.log(products);
      // console.log(fakeProductList);
      // console.log(products === fakeProduct);
      expect(products).to.be.an('array');
      // expect(products).to.be.an('array');
    });
    
  });

  describe('Get an specific product from the database,', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([fakeProductList]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('if successful, returns one product', async () => {
      const product = await productsModel.getProductsById(1);
      // console.log(product[0]);
      expect(product[0]).to.be.equal(fakeProductList[0]);
    });
  });

  describe('Get an specific product from the database fails', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('if id is not found, returns undefined', async () => {
      const products = await productsModel.getProductsById(100);
      expect(products).to.be.undefined;
    });
  });

  describe('Add a product to the database', () => {
    before(() => {
      // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('if successful, a product is added to the database', async () => {
      const newProduct = await productsModel.createProduct(fakeProduct);
      expect(newProduct.id).to.be.equal(1);
    });
  });

  describe('Update a product in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves({ id: 1,name: 'Batman Belt', quantity: 9,});
    });
    after(() => connection.execute.restore());
    it('if successful, a product is updated in the database', async () => {
      const product = await productsModel.updateProduct({ id: 1,name: 'Batman Belt', quantity: 9,});
      // console.log(product);
      // console.log(updatedProduct);
      expect(product).to.deep.equal(updatedProduct);
      expect(typeof product).to.be.an.equal('object');
    })
  })
});
