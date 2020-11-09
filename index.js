const express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors')({
  origin: 'http://localhost:3000',
});
const app = express();
app.use(BodyParser.json());
app.use(cors);
const port = 5000;
const itemsService = require("./services/items");

app.get("/api/items", async (req, res) => {
  const { search } = req.query;
   console.log("logger fetch items listing ::", search);
  const response = await itemsService.search(search);
  res.json(response);
});

app.get("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  console.log("logger fetch detail item listing ::", id);
  const response = await itemsService.detail(id);
  res.json(response);
})

app.listen(port, () => {
  console.log(`La app esta abierta en http://localhost:${port}`);
});
