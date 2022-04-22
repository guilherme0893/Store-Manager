const salesModel = require('../../../models/salesModel');
const saleMock = require('../../unit/mocks/saleMock');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Tests saleModel', () => {
  describe('getAllSales gets all sales from the database', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([saleMock.fakeSaleList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('returns all sales from the database', async () => {
        const sales = await salesModel.getAllSales();
        // expect(sales).to.be.an('array');
        expect(sales).to.be.deep.eq(saleMock.fakeSaleList);
      });
    });
  });  

  describe('getSalesById gets a specific sale from the database,', () => {

    describe('if it is successfull', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([saleMock.fakeSaleList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('returns one sale', async () => {
        const sale = await salesModel.getSalesById(1);
        console.log(sale);
        // expect(sale).to.be.equal('object');
        expect(sale[0]).to.be.deep.eq(saleMock.fakeSaleList[0])
      });
    });
  });

  describe('createNewSale add a sale to the database', () => {

    describe('if it is successfull', () => {
      before(() => {
        // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
        // sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
        sinon.stub(connection,'execute').resolves(saleMock.fakeSaleList);
      });
      after(() => {
        connection.execute.restore();
      });
      it('a sale is added to the database', async () => {
        // const newFakeSale = {
        //   saleId: 3,
        //   date: '1993-11-08T09:50:30.000Z',
        //   productId: 1,
        //   quantity: 10,
        // };
        const newSale = await salesModel.createNewSale(saleMock.newFakeSale);
        // console.log(newSale);
        // expect(newSale.id).to.be.equal(3);
        expect(newSale).to.be.deep.eq(saleMock.newFakeSale);
      });
    });
  });

  describe('updateSale updates a sale in the database', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves(saleMock.fakeSaleList);
      });
      after(() => connection.execute.restore());

      it('a sale is updated in the database', async () => {
        // const updateSale = async (saleId, sales) => {
        // await connection.execute(query, [productId, quantity, saleId, productId]);
        const sale = await productsModel.updateProduct(1, saleMock.fakeSale);
        expect(sale).to.deep.equal(saleMock.updatedFakeSaleList)
        expect(typeof sale).to.be.an.equal('object');
      });
    });
  });

  describe('deleteSale deletes a sale from in the database', () => {
    describe('if it is successfull', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(saleMock.fakeSaleList);
      });
      after(() => {
        connection.execute.restore();
      });

      it('a sale is deleted from the database', async () => {
        const removedSale = await salesModel.deleteSale(1);
        expect(removedSale).to.be.an('undefined');
      });
    });
  });
});
