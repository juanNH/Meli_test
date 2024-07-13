const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./src/middleware/errorHandler');
dotenv.config();


const app = express();
const port = process.env.PORT;



const routerV1 = require('./src/v1/indexRouter');
app.use("/api/v1",routerV1);

app.get("/ping", (req, res) => {
  res.send({ response: "pong" });
});

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Meli test app running on http://localhost:${port}`);
}) 