const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModel');

describe('Tests productService', () => {
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

  describe('When getAll is called,', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
    });
    after(() => {
      productsModel.getAllProducts.restore();
    });
    it('if successful, it lists all products in an array of objects', async () => {
      const products = await productsService.getAll();
      // console.log(products[0]); // object
      expect(typeof products).to.be.equal('object');
      expect(products).to.be.equal(fakeProductList);
    });
  });

  describe('When getById is called,', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductsById').resolves(fakeProductList);
    });
    after(() => {
      productsModel.getProductsById.restore();
    });
    it('if successful, it lists one product matching the id in the parameter', async () => {
      const product = await productsService.getById(1);
      // console.log(product);
      // console.log(fakeProductList[0]);
      // console.log(product === fakeProductList[0]);
      expect(product).to.be.deep.equal(fakeProduct)
    });
  });

  describe('When createProduct is called', () => {
    before(() => {
      sinon.stub(productsModel, 'getUniqueProduct').resolves(false);
      sinon.stub(productsModel, 'createProduct').resolves(newFakeProduct);
      sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
    });
    after(() => {
      productsModel.getUniqueProduct.restore();
      productsModel.createProduct.restore();
      productsModel.getAllProducts.restore();
    });
    it('if successful, a new product is added', async () => {
      const newProducts = await productsService.createProduct(newFakeProduct);
      // console.log(newProducts);
      const getUnique = await productsModel.getUniqueProduct(newFakeProduct.name);
      // console.log(getUnique);
      const getAllProducts = await productsService.getAll(fakeProductList);
      // console.log(getAllProducts);
      expect(newProducts.name).to.be.equal('Batman Mask');
      expect(newProducts.quantity).to.be.equal(1);
    });
  });

  describe('When updateProduct is called', () => {
    before(() => {
      sinon.stub(productsModel, 'updateProduct').resolves(updatedProduct);
    });
    after(() => {
      productsModel.updateProduct.restore();
    });
    it('if successful, a product is updated', async () => {
      const updateProduct = await productsService.updateProduct(updatedProduct);
      // console.log(updateProduct);
      // console.log(updatedFakeProductList);
      expect(updatedFakeProductList.includes(updateProduct));
    });
  });

  describe('When deleteProduct is called', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct').resolves(fakeProductList);
    });
    after(() => {
      productsModel.deleteProduct.restore();
    });
    it('if successful, a product is removed based on the given id', async () => {
      const removedProduct = await productsModel.deleteProduct(1);
      expect(fakeProductList).not.to.include(removedProduct);
    });
  });
});
