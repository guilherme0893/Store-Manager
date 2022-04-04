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

  describe('When getAll is called,', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
    });
    after(() => {
      productsModel.getAllProducts.restore();
    });
    it('if successful, it lists all products in an array', async () => {
      const products = await productsService.getAll();
      // console.log(products[0], 'product zero');
      expect(products).to.be.equal(fakeProductList);
    });
    // it('Returns an empty array if no product is found', async () => {
    //   const products = await productsService.getAll();
    //   expect(products).to.be.
    // })
  });

  // describe('When getById is called', () => {
  //   it('if successful, it returns a unique object with the specific id', async () => {
  //     before(() => {
  //       // sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
  //       sinon.stub(productsModel, 'getProductsById').resolves(fakeProduct);
  //     });
  //     after(() => {
  //       productsModel.getProductsById.restore();
  //     });
  //     // const products = await productsService.getAll();
  //     // const firstProduct = products[0];
  //     const product = await productsService.getById(1);
  //     console.log(product);
  //     // console.log(product, 'sou o product');
  //     // console.log(firstProduct, 'sou o firstProduct');
  //     // expect(product).to.be.true;
  //   });
  // })

    // it('if fails, it returns an error', () => {

    // })

  // describe('When createProduct is called', () => {
  //   it('if successfull, it inserts a product in the database', async () => {
  //     before(() => {
  //       sinon.stub(productsModel, 'createProduct').resolves({ name: 'Batman Mask', quantity: 1 });
  //     });
  //     after(() => {
  //       productsModel.createProduct.restore();
  //     });
  //     const newProduct = await productsService.createProduct({ name: 'Batman Mask', quantity: 1 });
  //     console.log(newProduct)
  //   });
  // })
  // describe('When getById successful')

  // describe('When createProduct successful, creates a product', async () => {
  //   const product = await productsService.createProduct({ name: 'Batman Belt', quantity: 10 });
  //   expect(product.name).to.be.equal('Batman Belt');
  //   expect(product.quantity).to.be.equal(10);
  // })
})