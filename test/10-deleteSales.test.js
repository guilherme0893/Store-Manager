require("dotenv").config();
const frisby = require("frisby");
const mysql = require("mysql2/promise");
const Importer = require("mysql-import");

describe("10-deleteSales", () => {
  jest.setTimeout(9000)
  const url = `http://localhost:${process.env.PORT}`;
  const INVALID_ID = 99999;
  let connection;

  beforeAll(async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    const importer = new Importer({
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      host: MYSQL_HOST,
    });

    await importer.import("./StoreManager.sql");

    importer.disconnect();
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE StoreManager");
    await connection.end();
  });
 
  describe("10 - Crie um endpoint para deletar uma venda", () => {
    it("Será validado que não é possível deletar uma venda que não existe", async () => {
      await frisby
        .delete(`${url}/sales/${INVALID_ID}`)
        .expect("status", 404)
        .then((response) => {
          const { json } = response;
  
          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Sale not found");
        });
    });

    it("Será validado que é possível deletar uma venda com sucesso", async () => {
      await frisby
        .delete(`${url}/sales/1`)
        .expect("status", 204);

      await frisby
        .get(`${url}/sales/1`)
        .expect("status", 404)
        .then((response) => {
          const { json } = response;
  
          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Sale not found");
        });
    });
  });
});
