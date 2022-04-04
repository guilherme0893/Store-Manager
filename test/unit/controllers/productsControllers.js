const productsController = require('../../../controllers/productsController');
const productService = require('../../../services/productsServices');
const { expect } = require('chai');
const sinon = require('sinon');

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

  const response = {};
  const request = {};

  describe('returns all products', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    it('is successful, if all products are returned', async () => {
      sinon.stub(productService, 'getAll').resolves([fakeProductList]);
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith([fakeProductList])).to.be.true;
      productService.getAll.restore();
    });
  });

  describe('return a specific product', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    it('is successful, if only one product is returned', async () => {
      // simula a chamada do product[0] ---> com o id: 1
      sinon.stub(productService, 'getById').resolves([fakeProductList[0]]);
      request.params = { id: 1 };
      await productsController.getProductsById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith([fakeProductList[0]])).to.be.true;
      productService.getById.restore();
    });
  });

  // describe('a newProduct is added in the database', () => {
  //   before(() => {
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   });
  //   it('is successful if a new product is inserted in the database', async () => {
  //     request.body = { name: 'Batman Belt', quantity: 10}
  //     sinon.stub(productService, 'createProduct').resolves([fakeProduct]);
  //     await productsController.createProduct(request, response);
  //     expect(response.status.calledWith(201)).to.be.true;
  //     expect(response.json.calledWith(fakeProduct)).to.be.true;
  //     productService.createProduct.restore();
  //   });
  // });
})
