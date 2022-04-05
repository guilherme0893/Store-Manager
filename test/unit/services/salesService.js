const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

describe('Tests salesService', () => {

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

  const fakeProductToBeDeleted = {
    saleId: 1,
    date: '2022-04-05T16:09:38.000Z',
    productId: 3,
    quantity: 15
  };

  describe('When getAll is called,', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(salesModel, 'getAllSales').resolves(fakeSaleList);
      });
      after(() => salesModel.getAllSales.restore());

      it('lists all products in an object', async () => {
        const sales = await salesService.getAll();
        expect(typeof sales).to.be.equal('object');
        expect(sales).to.be.equal(fakeSaleList);
      });
      it('it has length equal or higher than one', async () => {
        const sales = await salesService.getAll();
        expect(sales.length).to.be.greaterThanOrEqual(1);
      });
    });

    describe('if it fails', () => {

      before(() => {
        sinon.stub(salesModel, 'getAllSales').resolves();
      });
      after(() => salesModel.getAllSales.restore());

      it('undefined is returned', async () => {
        const sales = await salesService.getAll();
        expect(sales).to.be.equal(undefined);
      });
    });
  });

  describe('When getById is called,', () => {

    describe('if it is successful,', () => {

      before(() => {
        sinon.stub(salesModel, 'getSalesById').resolves(fakeSaleList[0]);
      });
      after(() => {
        salesModel.getSalesById.restore();
      });

      it('it lists all sales matching the id in the parameter in an object', async () => {
        const id = 1;
        const sale = await salesService.getById(id);
        // console.log(sale);
        expect(sale).to.be.an('object');
      });

      // LOGICA INVALIDADA PORQUE ACIMA É UM OBJECT
      // it('it has length equal or higher than one', async () => {
      //   const id = 1;
      //   const sale = await salesService.getById(id);
      //   console.log(sale);
      //   expect(sale.length).to.be.greaterThanOrEqual(1);
      // });
    });
  });
  
  describe('When createNewSale is called', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(salesModel, 'getAllSales').resolves([fakeSaleList]);
        sinon.stub(salesModel, 'createNewSale').resolves({ id: 1, itemsSold: newFakeSale });
      });
      after(() => {
        salesModel.getAllSales.restore();
        salesModel.createNewSale.restore();
      });

      it('a new product is added', async () => {
        const newSale = await salesModel.createNewSale(newFakeSale);
        // console.log(newSale);
        expect(newSale).to.be.deep.equal({ id: 1, itemsSold: newFakeSale });
      });
    });
  });

  describe('When updateSale is called', () => {

    describe('if it is successful', () => {
      before(() => {
        sinon.stub(salesModel, 'updateSale').resolves({ saleId: 1, itemUpdated: updatedSale });
      });
      after(() => {
        salesModel.updateSale.restore();
      });

      it('a sale is updated', async () => {
        // no salesService recebe dois parametros --> id & sale
        const updateSale = await salesService.updateSale(1, updatedSale);
        expect(updateSale).to.be.an('object');
        expect(updateSale).to.be.deep.equal({ saleId: 1, itemUpdated: updatedSale })
      });
    })
  });

  describe('When deleteSale is called', () => { 
    before(() => {
      sinon.stub(salesModel, 'deleteSale').resolves();
    });
    after(() => {
      salesModel.deleteSale.restore();
    });
    it('if successful, a sale is removed based on the given id', async () => {
      const removedSale = await salesModel.deleteSale(1);
      expect(removedSale).to.be.an('undefined');
    });
  });
});
