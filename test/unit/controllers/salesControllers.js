const salessController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesServices');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Test salessController', () => {

  const fakeSaleList = [
    {
      saleId: 1,
      date: '2022-04-05T16:09:38.000Z',
      productId: 1,
      quantity: 5
  },
  {
      saleId: 2,
      date: '2022-04-05T16:09:38.000Z',
      productId: 3,
      quantity: 15
  },
];

  const newFakeSale = {
    productId: 3,
    quantity: 20
  };

  const updatedSale = {
      productId: 1,
      quantity: 6
  };

  const fakeSaleToBeDeleted = {
    saleId: 1,
    date: '2022-04-05T16:09:38.000Z',
    productId: 3,
    quantity: 15
  };

  const response = {};
  const request = {};

  describe('getAllSales returns all products', () => {

    describe('if it is successfull,', () => {

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      // after(() => {
      //   salessController.getAll.restore();
      // });

      it('all sales are returned', async () => {
        sinon.stub(salesService, 'getAll').resolves([fakeSaleList]);
        await salessController.getAllSales(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith([fakeSaleList])).to.be.true;
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
        salesService.getById.restore();
      });

      it('the sale with the indicated id is returned', async () => {
        sinon.stub(salesService, 'getById').resolves([fakeSaleList[0]]);
        request.params = { id: 1 };
        await salessController.getSalesById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith([fakeSaleList[0]])).to.be.true;
      });
    });
  });

  describe('deleteSale removes a specific product', () => {

    describe('if it is successful', () => {

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('the sale is removed', async () => {
        request.params = { id: 1 };
        
        request.body = { productId: newFakeSale.productId, quantity: newFakeSale.quantity };
        sinon.stub(salesService, 'getById').resolves(true);
        sinon.stub(salesService, 'deleteSale').resolves();
        const deletedSale = await salessController.deleteSale(request, response);
        expect(deletedSale).to.be.an('undefined');
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
  //     request.body = { name: 'Batman Belt', quantity: 10}
  //     sinon.stub(productService, 'createProduct').resolves([fakeProduct]);
  //     const newProduct = await productsController.createProduct(request, response);
  //     expect(newProduct).to.be.true;
  //   });
  // });
});
