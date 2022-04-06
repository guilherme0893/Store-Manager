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
    quantity: 10,
  };

  const orignalFakeSaleList = [
    {    
      sale_id: 1,
      date: '1993-11-08T09:50:30.000Z',
      product_id: 1,
      quantity: 10,
    },
    {  
      saleId: 2,
      date: '1993-11-08T09:50:40.000Z',   
      productId: 2,
      quantity: 20,
    },
  ];

  const fakeSale = [
    {
      date: '1993-11-08T09:50:30.000Z',
      productId: 1,
      quantity: 9,
   },
  ];

  describe('getAllSales gets all sales from the database', () => {

    describe('if it is successful', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([fakeSaleList]);
      });
      after(() => {
        connection.execute.restore();
      });

      it('returns all sales from the database as an array', async () => {
        const sales = await salesModel.getAllSales();
        // console.log(sales);
        expect(sales).to.be.an('array');
        // expect(sales).to.be.deep.equal(orignalFakeSaleList);
      });
    });
  });  

  describe('getSalesById gets a specific sale from the database,', () => {

    describe('if it is successfull', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(fakeSale);
      });
      after(() => {
        connection.execute.restore();
      });

      // it('returns one sale', async () => {
      //   const sale = await salesModel.getSalesById();
      //   // console.log(sale);
      //   expect(sale).to.be.equal('object');
      // });
    });
  });

  describe('createNewSale add a sale to the database', () => {

    describe('if it is successfull', () => {
      before(() => {
        // cria o dublê e indica que o insertId será 1 --- o valor não necessariamente precisa existir
        sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      });
      after(() => {
        connection.execute.restore();
      });
      // it('a sale is added to the database', async () => {
      //   const newSale = await salesModel.createNewSale(newFakeSale);
      //   console.log(newSale);
      //   expect(newSale.id).to.be.equal(3);
      // });
    });
  });

  describe('deleteSale deletes a sale from in the database', () => {
    describe('if it is successfull', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves();
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
