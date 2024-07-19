const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Meli test app running on http://localhost:${port}`);
});