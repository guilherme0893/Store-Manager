const productsModel = require('../../../models/productsModel');
const productMock = require('../../unit/mocks/productMock');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Tests productModel', () => {

  describe('getAllProducts get all products from the database', () => {

    describe('if it is successful,', () => {

      before(() => {
        // no model o array é desestruturado!!
        sinon.stub(connection, 'execute').resolves([productMock.fakeProductList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('returns all products from the database', async () => {
        const products = await productsModel.getAllProducts();
        // expect(products).to.be.an('array');
        expect(products).to.be.deep.eq(productMock.fakeProductList);
      });
    });
  });

  describe('getProductsById gets product with a specific id from the database,', () => {

    describe('if it is successfull,', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([productMock.fakeProductList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('it returns one product', async () => {
        const product = await productsModel.getProductsById(1);
        expect(product[0]).to.be.deep.eq(productMock.fakeProductList[0]);
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
        expect(products).to.be.undefined;        
      });
    });
  });

  describe('createProduct adds an item to the database', () => {

    describe('if it is successfull', () => {

      before(() => {
        // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
        sinon.stub(connection, 'execute').resolves(productMock.fakeProductList);
      });
      after(() => {
        connection.execute.restore();
      });

      it('a new item is added', async () => {

        const newProduct = await productsModel.createProduct(productMock.newFakeProduct);
        // expect(newProduct).to.be.deep.eq(productMock.newFakeProduct);
        expect(newProduct).to.be.an('object');
        expect(connection.execute.calledOnce).to.be.true; // para confirmar que foi criado poderia fazer depos um getAll e checar
      });
    });
  });

  describe('updateProduct updates a product in the database', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves(productMock.fakeProductList);
      });
      after(() => connection.execute.restore());

      it('a product is updated in the database', async () => {
        const product = await productsModel.updateProduct(productMock.updatedProduct);
        // expect(product).to.deep.eq(productMock.updatedFakeProductList);  --> novamente parece que teria de chamar o getAll aqui!
        expect(product).to.be.deep.eq(productMock.updatedProduct);
        expect(connection.execute.calledOnce).to.be.true;
      });
    });
  });

  describe('deleteProduct deletes a product in the database', () => {
    describe('if it is successfull', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves(productMock.fakeProductList);
      });
      after(() => {
        connection.execute.restore();
      });

      it('a product is deleted from the database', async () => {
        const removedProduct = await productsModel.deleteProduct(1);
        expect(removedProduct).to.be.an('undefined');
      });
    });
  });
});
