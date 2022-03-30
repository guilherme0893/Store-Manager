require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/product-routes');
const saleRoutes = require('./routes/sale-routes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
