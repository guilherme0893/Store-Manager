const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

describe('Tests salesService', () => {
  const fakeSaleList = [
    {
      "productId": 1,
      "quantity": 3,
    },
    {
      "productId": 2,
      "quantity": 5,
    }
  ];
  const fakeSale = {
    id: 1,
    quantity: 100,
  };

  describe('When getAll is called,', () => {
    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves(fakeSaleList);
    });
    after(() => {
      salesModel.getAllSales.restore();
    });
    it('if successful, it lists all sales in an array of objects', async () => {
      const sales = await salesService.getAll();
      // console.log(products[0]); // object
      expect(typeof sales).to.be.equal('object');
      expect(sales).to.be.equal(fakeSaleList);
    });
  });

  describe('When getById is called,', () => {
    before(() => {
      sinon.stub(salesModel, 'getSalesById').resolves([fakeSaleList[0]]);
    });
    // after(() => {
    //   salesModel.getProductsById.restore();
    // });
    it('if successful, it lists one sale matching the id in the parameter', async () => {
      const sale = await salesService.getById(1);
      // console.log(product);
      // console.log(fakeProductList[0]);
      // console.log(product === fakeProductList[0]);
      expect(sale).to.be.deep.equal([fakeSaleList[0]])
    });
  });

  describe.skip('When createProduct is called', () => {
    before(() => {
      sinon.stub(productsModel, 'getUniqueProduct').resolves(false);
      sinon.stub(productsModel, 'createProduct').resolves(newFakeProduct);
      sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
    });
    // after(() => {
    //   productsModel.getUniqueProduct.restore();
    //   productsModel.createProduct.restore();
    //   productsModel.getAllProducts.restore();
    // });
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

  describe.skip('When updateProduct is called', () => {
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

  describe.skip('When deleteProduct is called', () => {
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
