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
    id: 3,
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
    name: 'Batman Mask',
    quantity: 1,
  };
  
  describe('getAllProducts get all products from the database', () => {

    describe('if it is successful,', () => {

      before(() => {
        // no model o array é desestruturado!!
        sinon.stub(connection, 'execute').resolves([fakeProductList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('returns all products from the database as an array', async () => {
        const products = await productsModel.getAllProducts();
        // console.log(products);
        // console.log(fakeProductList);
        expect(products).to.be.an('array');
        expect(products).to.be.deep.equal(fakeProductList);
      });
    });
  });

  describe('getProductsById gets product with a specific id from the database,', () => {

    describe('if it is successfull,', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([fakeProductList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('it returns one product', async () => {
        const product = await productsModel.getProductsById(1);
        // console.log(product);
        expect(product[0]).to.be.equal(fakeProductList[0]);
      });
    });

    describe('if it fails', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('it returns undefined if the id does not exist', async () => {
        const products = await productsModel.getProductsById(100);
        // console.log(products);
        expect(products).to.be.undefined;        
      });
    });
  });

  describe('createProduct adds an item to the database', () => {

    describe('if it is successfull', () => {

      before(() => {
        // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
        sinon.stub(connection, 'execute').resolves([{insertId: 3}]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('a new item is added', async () => {
        const newProduct = await productsModel.createProduct(newFakeProduct);
        // console.log(newProduct);
        // console.log(newFakeProduct);
        expect(newProduct.id).to.be.equal(3);
      });
    });
  });

  describe('updateProduct updates a product in the database', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves({ id: 1,name: 'Batman Belt', quantity: 9,});
      });
      after(() => connection.execute.restore());

      it('a product is updated in the database', async () => {
        const product = await productsModel.updateProduct({ id: 1,name: 'Batman Belt', quantity: 9,});
        // console.log(product);
        // console.log(updatedProduct);
        expect(product).to.deep.equal(updatedProduct);
        expect(typeof product).to.be.an.equal('object');
      });
    });
  });

  describe('deleteProduct deletes a product in the database', () => {
    describe('if it is successfull', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves();
      });
      after(() => {
        connection.execute.restore();
      });

      it('a product is deleted from the database', async () => {
        const removedProduct = await productsModel.deleteProduct(1);
        // console.log(removedProduct);
        expect(removedProduct).to.be.an('undefined');
      });
    });
  });
});
