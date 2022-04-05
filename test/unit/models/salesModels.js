const salesModel = require('../../../models/salesModel');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Tests productModel', () => {
  const fakeSaleList = [
    {    
      saleId: 1,
      date: '1993-11-08T09:50:30.000Z',
      productId: 1,
      quantity: 10,
    },
    {  
      saleId: 2,
      date: '1993-11-08T09:50:40.000Z',   
      productId: 2,
      quantity: 20,
    },
  ];
  const newFakeSale = {
    saleId: 3,
    date: '1993-11-08T09:50:30.000Z',
    productId: 1,
    quantity: 9,
  };

  describe('Get all sales from the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([fakeSaleList]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('if successful, returns all sales from database', async () => {
      const sales = await salesModel.getAllSales();
      expect(sales).to.be.an('array');
    });
  });  

  describe('Get an specific sale from the database,', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([fakeSaleList]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('if successful, returns one sale', async () => {
      const sale = await salesModel.getSalesById(1);
      // console.log(product[0]);
      expect(sale[0]).to.be.an('object');
    });
  });

  // describe('Add a sale to the database', () => {
  //   before(() => {
  //     // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
  //     sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  //   });
  //   after(() => {
  //     connection.execute.restore();
  //   })
  //   it('if successful, a sale is added to the database', async () => {
  //     const newSale = await salesModel.createNewSale(newFakeSale);
  //     console.log(newSale);
  //     // expect(newSale.id).to.be.equal(1);
  //   });
  // });
});
