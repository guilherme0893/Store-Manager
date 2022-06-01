const productsController = require('../../../controllers/productsController');
const productService = require('../../../services/productsServices');
const { expect } = require('chai');
const sinon = require('sinon');
// teste

describe('Test productControllers', () => {
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
    // id: 1,
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

  const response = {};
  const request = {};

  describe('getAllProducts returns all products', () => {

    describe('if it is successfull,', () => {

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      // after(() => {
      //   productService.getAll.restore();
      // });

      it('all products are returned', async () => {
        sinon.stub(productService, 'getAll').resolves([fakeProductList]);
        await productsController.getAllProducts(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith([fakeProductList])).to.be.true;
        productService.getAll.restore();
      });
    });
  });

  describe('getById returns a specific product', () => {

    describe('if it is successful,', () => {

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      after(() => {
        productService.getById.restore();
      });

      it('the product with the indicated id is returned', async () => {
        sinon.stub(productService, 'getById').resolves([fakeProductList[0]]);
        request.params = { id: 1 };
        await productsController.getProductsById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith([fakeProductList[0]])).to.be.true;
      });
    });
  });

  describe('deleteProduct removes a specific product', () => {

    describe('if it is successful', () => {

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('the product is removed', async () => {
        request.params = { id: 1 };
        request.body = { name: fakeProduct.name, quantity: fakeProduct.quantity };
        sinon.stub(productService, 'getById').resolves(true);
        sinon.stub(productService, 'deleteProduct').resolves();
        const deletedProduct = await productsController.deleteProduct(request, response);
        expect(deletedProduct).to.be.an('undefined');
        expect(response.status.calledWith(204)).to.be.true;
        expect(response.json.called).to.be.false; // lembrar que tem um end();
      });
    });
  });

  // describe('a newProduct is added in the database', () => {
  //   it('is successful if a new product is inserted in the database', async () => {
  //     const response = {};
  //     const request = {};
  //     before(() => {
  //       response.status = sinon.stub().returns(response);
  //       response.json = sinon.stub().returns();
  //     });
  //     after(() => productService.createProduct.restore());
  //     // request.body = { name: 'Batman Belt', quantity: 10}
  //     sinon.stub(productService, 'createProduct').resolves(newFakeProduct);
  //     await productsController.createProduct(request, response);
  //     expect(response.json.calledWith(newFakeProduct)).to.be.true;
  //   });
  // });
});
