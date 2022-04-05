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

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
      });
      after(() => {
        productsModel.getAllProducts.restore();
      });

      it('if successful, it lists all products in an array of objects', async () => {
        const products = await productsService.getAll();
        expect(typeof products).to.be.equal('object');
        expect(products).to.be.equal(fakeProductList);
      });
      it('it has length equal or higher than one', async () => {
        const products = await productsService.getAll();
        expect(products.length).to.be.greaterThanOrEqual(1);
      });
    });

    describe('if it fails', () => {
      before(() => {
        sinon.stub(productsModel, 'getAllProducts').resolves();
      });
      after(() => {
        productsModel.getAllProducts.restore();
      });

      it('undefined is returned', async () => {
        const products = await productsService.getAll();
        expect(products).to.be.equal(undefined);
      })
    })
  });

  describe('When getById is called,', () => {

    describe('if successful,', () => {

      before(() => {
        sinon.stub(productsModel, 'getProductsById').resolves(fakeProductList);
      });
      after(() => {
        productsModel.getProductsById.restore();
      });

      it('it lists one product matching the id in the parameter', async () => {
        const product = await productsService.getById(1);
        // console.log(product);
        expect(product).to.be.an('object');
        expect(product).to.be.deep.equal(fakeProduct)
      });

    // LOGICA INVALIDADA PORQUE ACIMA É UM OBJECT
    //   it('it has length equal to one', async () => {
    //     const product = await productsService.getById(1);
    //     console.log(product.length);
    //     expect(product.length).to.be.greaterThanOrEqual(1);
    //   });
    });
  });

  describe('When createProduct is called', () => {

    describe('if it is successful,', () => {
      before(() => {
        sinon.stub(productsModel, 'getAllProducts').resolves([fakeProductList]);
        sinon.stub(productsModel, 'createProduct').resolves(newFakeProduct);
        sinon.stub(productsModel, 'getUniqueProduct').resolves(false);
      });
      after(() => {
        productsModel.getAllProducts.restore();
        productsModel.createProduct.restore();
        productsModel.getUniqueProduct.restore();
      });

      it('a new product is added,', async () => {
        const newProducts = await productsService.createProduct(newFakeProduct);
        expect(newProducts).to.be.deep.equal(newFakeProduct);
        expect(newProducts.name).to.be.equal('Batman Mask');
        expect(newProducts.quantity).to.be.equal(1);
      });
    });
  });

  describe('When updateProduct is called', () => {

    describe('if it is successful,', () => {
      before(() => {
        sinon.stub(productsModel, 'updateProduct').resolves(updatedProduct);
      });
      after(() => {
        productsModel.updateProduct.restore();
      });
    });

    it('a product is updated', async () => {
      const updateProduct = await productsService.updateProduct(updatedProduct);
      expect(updatedFakeProductList.includes(updateProduct));
    });
  });

  describe('When deleteProduct is called', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct').resolves();
    });
    after(() => {
      productsModel.deleteProduct.restore();
    });
    it('if successful, a product is removed based on the given id', async () => {
      const removedProduct = await productsModel.deleteProduct(1);
      // console.log(removedProduct);
      expect(removedProduct).to.be.an('undefined');
    });
  });
});
